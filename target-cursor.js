class TargetCursor {
  constructor(options = {}) {
    this.targetSelector = options.targetSelector || '.cursor-target';
    this.spinDuration = options.spinDuration || 2;
    this.hideDefaultCursor = options.hideDefaultCursor !== undefined ? options.hideDefaultCursor : true;
    this.hoverDuration = options.hoverDuration || 0.2;
    this.parallaxOn = options.parallaxOn !== undefined ? options.parallaxOn : true;

    this.cursor = null;
    this.dot = null;
    this.corners = [];
    this.spinTl = null;
    this.activeTarget = null;
    this.currentLeaveHandler = null;
    this.resumeTimeout = null;
    this.targetCornerPositions = null;
    this.activeStrength = { current: 0 };
    this.isMobile = this.checkIsMobile();

    this.constants = {
      borderWidth: 3,
      cornerSize: 12
    };

    if (this.isMobile) return;

    this.init();
  }

  checkIsMobile() {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }

  init() {
    this.createCursorElement();
    
    if (this.hideDefaultCursor) {
      document.body.style.cursor = 'none';
      // Also apply to all elements to ensure it stays hidden
      const style = document.createElement('style');
      style.innerHTML = `* { cursor: none !important; }`;
      style.id = 'hide-cursor-style';
      document.head.appendChild(style);
    }

    gsap.set(this.cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    this.createSpinTimeline();

    this.moveHandler = (e) => this.moveCursor(e.clientX, e.clientY);
    window.addEventListener('mousemove', this.moveHandler);

    this.scrollHandler = () => this.handleScroll();
    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    this.mouseDownHandler = () => {
      gsap.to(this.dot, { scale: 0.7, duration: 0.3 });
      gsap.to(this.cursor, { scale: 0.9, duration: 0.2 });
    };
    this.mouseUpHandler = () => {
      gsap.to(this.dot, { scale: 1, duration: 0.3 });
      gsap.to(this.cursor, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousedown', this.mouseDownHandler);
    window.addEventListener('mouseup', this.mouseUpHandler);

    this.mouseoverHandler = (e) => this.handleMouseOver(e);
    window.addEventListener('mouseover', this.mouseoverHandler, { passive: true });

    this.tickerFn = () => this.updateTicker();
  }

  createCursorElement() {
    const wrapper = document.createElement('div');
    wrapper.className = 'target-cursor-wrapper';
    
    const dot = document.createElement('div');
    dot.className = 'target-cursor-dot';
    wrapper.appendChild(dot);
    
    const corners = ['tl', 'tr', 'br', 'bl'].map(pos => {
      const corner = document.createElement('div');
      corner.className = `target-cursor-corner corner-${pos}`;
      wrapper.appendChild(corner);
      return corner;
    });

    document.body.appendChild(wrapper);
    
    this.cursor = wrapper;
    this.dot = dot;
    this.corners = corners;
  }

  createSpinTimeline() {
    if (this.spinTl) {
      this.spinTl.kill();
    }
    this.spinTl = gsap
      .timeline({ repeat: -1 })
      .to(this.cursor, { rotation: '+=360', duration: this.spinDuration, ease: 'none' });
  }

  moveCursor(x, y) {
    if (!this.cursor) return;
    gsap.to(this.cursor, {
      x,
      y,
      duration: 0.1,
      ease: 'power3.out'
    });
  }

  handleScroll() {
    if (!this.activeTarget || !this.cursor) return;
    const mouseX = gsap.getProperty(this.cursor, 'x');
    const mouseY = gsap.getProperty(this.cursor, 'y');
    const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
    const isStillOverTarget =
      elementUnderMouse &&
      (elementUnderMouse === this.activeTarget || elementUnderMouse.closest(this.targetSelector) === this.activeTarget);
    if (!isStillOverTarget) {
      if (this.currentLeaveHandler) {
        this.currentLeaveHandler();
      }
    }
  }

  handleMouseOver(e) {
    const directTarget = e.target;
    let target = null;
    let current = directTarget;
    while (current && current !== document.body) {
      if (current.matches && current.matches(this.targetSelector)) {
        target = current;
        break;
      }
      current = current.parentElement;
    }

    if (!target || !this.cursor || !this.corners.length) return;
    if (this.activeTarget === target) return;
    
    if (this.activeTarget) {
      this.cleanupTarget(this.activeTarget);
    }
    
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
      this.resumeTimeout = null;
    }

    this.activeTarget = target;
    gsap.killTweensOf(this.corners);
    gsap.killTweensOf(this.cursor, 'rotation');
    if (this.spinTl) this.spinTl.pause();
    gsap.set(this.cursor, { rotation: 0 });

    const rect = target.getBoundingClientRect();
    const { borderWidth, cornerSize } = this.constants;
    const cursorX = gsap.getProperty(this.cursor, 'x');
    const cursorY = gsap.getProperty(this.cursor, 'y');

    this.targetCornerPositions = [
      { x: rect.left - borderWidth, y: rect.top - borderWidth },
      { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
      { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
      { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
    ];

    gsap.ticker.add(this.tickerFn);

    gsap.to(this.activeStrength, {
      current: 1,
      duration: this.hoverDuration,
      ease: 'power2.out'
    });

    this.corners.forEach((corner, i) => {
      gsap.to(corner, {
        x: this.targetCornerPositions[i].x - cursorX,
        y: this.targetCornerPositions[i].y - cursorY,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    const leaveHandler = () => {
      gsap.ticker.remove(this.tickerFn);
      this.targetCornerPositions = null;
      gsap.set(this.activeStrength, { current: 0, overwrite: true });
      this.activeTarget = null;

      if (this.corners.length) {
        gsap.killTweensOf(this.corners);
        const { cornerSize } = this.constants;
        const positions = [
          { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: cornerSize * 0.5 },
          { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
        ];
        const tl = gsap.timeline();
        this.corners.forEach((corner, index) => {
          tl.to(
            corner,
            {
              x: positions[index].x,
              y: positions[index].y,
              duration: 0.3,
              ease: 'power3.out'
            },
            0
          );
        });
      }

      this.resumeTimeout = setTimeout(() => {
        if (!this.activeTarget && this.cursor && this.spinTl) {
          const currentRotation = gsap.getProperty(this.cursor, 'rotation');
          const normalizedRotation = currentRotation % 360;
          this.spinTl.kill();
          this.spinTl = gsap
            .timeline({ repeat: -1 })
            .to(this.cursor, { rotation: '+=360', duration: this.spinDuration, ease: 'none' });
          gsap.to(this.cursor, {
            rotation: normalizedRotation + 360,
            duration: this.spinDuration * (1 - normalizedRotation / 360),
            ease: 'none',
            onComplete: () => {
              if (this.spinTl) this.spinTl.restart();
            }
          });
        }
        this.resumeTimeout = null;
      }, 50);

      this.cleanupTarget(target);
    };

    this.currentLeaveHandler = leaveHandler;
    target.addEventListener('mouseleave', leaveHandler);
  }

  cleanupTarget(target) {
    if (this.currentLeaveHandler) {
      target.removeEventListener('mouseleave', this.currentLeaveHandler);
    }
    this.currentLeaveHandler = null;
  }

  updateTicker() {
    if (!this.targetCornerPositions || !this.cursor || !this.corners.length) {
      return;
    }

    const strength = this.activeStrength.current;
    if (strength === 0) return;

    const cursorX = gsap.getProperty(this.cursor, 'x');
    const cursorY = gsap.getProperty(this.cursor, 'y');

    this.corners.forEach((corner, i) => {
      const currentX = gsap.getProperty(corner, 'x');
      const currentY = gsap.getProperty(corner, 'y');

      const targetX = this.targetCornerPositions[i].x - cursorX;
      const targetY = this.targetCornerPositions[i].y - cursorY;

      const finalX = currentX + (targetX - currentX) * strength;
      const finalY = currentY + (targetY - currentY) * strength;

      const duration = strength >= 0.99 ? (this.parallaxOn ? 0.2 : 0) : 0.05;

      gsap.to(corner, {
        x: finalX,
        y: finalY,
        duration: duration,
        ease: duration === 0 ? 'none' : 'power1.out',
        overwrite: 'auto'
      });
    });
  }

  destroy() {
    if (this.tickerFn) {
      gsap.ticker.remove(this.tickerFn);
    }

    window.removeEventListener('mousemove', this.moveHandler);
    window.removeEventListener('mouseover', this.mouseoverHandler);
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('mousedown', this.mouseDownHandler);
    window.removeEventListener('mouseup', this.mouseUpHandler);

    if (this.activeTarget) {
      this.cleanupTarget(this.activeTarget);
    }

    if (this.spinTl) this.spinTl.kill();
    if (this.cursor && this.cursor.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor);
    }
    
    document.body.style.cursor = '';
    const style = document.getElementById('hide-cursor-style');
    if (style) style.remove();
  }
}
