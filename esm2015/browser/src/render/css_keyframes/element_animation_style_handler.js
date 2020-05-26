/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
const ANIMATION_PROP = 'animation';
const ANIMATIONEND_EVENT = 'animationend';
const ONE_SECOND = 1000;
export class ElementAnimationStyleHandler {
    constructor(_element, _name, _duration, _delay, _easing, _fillMode, _onDoneFn) {
        this._element = _element;
        this._name = _name;
        this._duration = _duration;
        this._delay = _delay;
        this._easing = _easing;
        this._fillMode = _fillMode;
        this._onDoneFn = _onDoneFn;
        this._finished = false;
        this._destroyed = false;
        this._startTime = 0;
        this._position = 0;
        this._eventFn = (e) => this._handleCallback(e);
    }
    apply() {
        applyKeyframeAnimation(this._element, `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`);
        addRemoveAnimationEvent(this._element, this._eventFn, false);
        this._startTime = Date.now();
    }
    pause() {
        playPauseAnimation(this._element, this._name, 'paused');
    }
    resume() {
        playPauseAnimation(this._element, this._name, 'running');
    }
    setPosition(position) {
        const index = findIndexForAnimation(this._element, this._name);
        this._position = position * this._duration;
        setAnimationStyle(this._element, 'Delay', `-${this._position}ms`, index);
    }
    getPosition() {
        return this._position;
    }
    _handleCallback(event) {
        const timestamp = event._ngTestManualTimestamp || Date.now();
        const elapsedTime = parseFloat(event.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES)) * ONE_SECOND;
        if (event.animationName == this._name &&
            Math.max(timestamp - this._startTime, 0) >= this._delay && elapsedTime >= this._duration) {
            this.finish();
        }
    }
    finish() {
        if (this._finished)
            return;
        this._finished = true;
        this._onDoneFn();
        addRemoveAnimationEvent(this._element, this._eventFn, true);
    }
    destroy() {
        if (this._destroyed)
            return;
        this._destroyed = true;
        this.finish();
        removeKeyframeAnimation(this._element, this._name);
    }
}
function playPauseAnimation(element, name, status) {
    const index = findIndexForAnimation(element, name);
    setAnimationStyle(element, 'PlayState', status, index);
}
function applyKeyframeAnimation(element, value) {
    const anim = getAnimationStyle(element, '').trim();
    let index = 0;
    if (anim.length) {
        index = countChars(anim, ',') + 1;
        value = `${anim}, ${value}`;
    }
    setAnimationStyle(element, '', value);
    return index;
}
function removeKeyframeAnimation(element, name) {
    const anim = getAnimationStyle(element, '');
    const tokens = anim.split(',');
    const index = findMatchingTokenIndex(tokens, name);
    if (index >= 0) {
        tokens.splice(index, 1);
        const newValue = tokens.join(',');
        setAnimationStyle(element, '', newValue);
    }
}
function findIndexForAnimation(element, value) {
    const anim = getAnimationStyle(element, '');
    if (anim.indexOf(',') > 0) {
        const tokens = anim.split(',');
        return findMatchingTokenIndex(tokens, value);
    }
    return findMatchingTokenIndex([anim], value);
}
function findMatchingTokenIndex(tokens, searchToken) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].indexOf(searchToken) >= 0) {
            return i;
        }
    }
    return -1;
}
function addRemoveAnimationEvent(element, fn, doRemove) {
    doRemove ? element.removeEventListener(ANIMATIONEND_EVENT, fn) :
        element.addEventListener(ANIMATIONEND_EVENT, fn);
}
function setAnimationStyle(element, name, value, index) {
    const prop = ANIMATION_PROP + name;
    if (index != null) {
        const oldValue = element.style[prop];
        if (oldValue.length) {
            const tokens = oldValue.split(',');
            tokens[index] = value;
            value = tokens.join(',');
        }
    }
    element.style[prop] = value;
}
function getAnimationStyle(element, name) {
    return element.style[ANIMATION_PROP + name];
}
function countChars(value, char) {
    let count = 0;
    for (let i = 0; i < value.length; i++) {
        const c = value.charAt(i);
        if (c === char)
            count++;
    }
    return count;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF9hbmltYXRpb25fc3R5bGVfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvcmVuZGVyL2Nzc19rZXlmcmFtZXMvZWxlbWVudF9hbmltYXRpb25fc3R5bGVfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLCtCQUErQixHQUFHLENBQUMsQ0FBQztBQUMxQyxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUM7QUFDbkMsTUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUM7QUFDMUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBRXhCLE1BQU0sT0FBTyw0QkFBNEI7SUFPdkMsWUFDcUIsUUFBYSxFQUFtQixLQUFhLEVBQzdDLFNBQWlCLEVBQW1CLE1BQWMsRUFDbEQsT0FBZSxFQUFtQixTQUErQixFQUNqRSxTQUFvQjtRQUhwQixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQW1CLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDN0MsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFtQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2xELFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBbUIsY0FBUyxHQUFULFNBQVMsQ0FBc0I7UUFDakUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVRqQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFPcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsS0FBSztRQUNILHNCQUFzQixDQUNsQixJQUFJLENBQUMsUUFB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R0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0tBQ0Y7SUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUM5QixDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxPQUFZLEVBQUUsSUFBWTtJQUNuRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxLQUFhLEVBQUUsSUFBWTtJQUM3QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLElBQUk7WUFBRSxLQUFLLEVBQUUsQ0FBQztLQUN6QjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmNvbnN0IEVMQVBTRURfVElNRV9NQVhfREVDSU1BTF9QTEFDRVMgPSAzO1xuY29uc3QgQU5JTUFUSU9OX1BST1AgPSAnYW5pbWF0aW9uJztcbmNvbnN0IEFOSU1BVElPTkVORF9FVkVOVCA9ICdhbmltYXRpb25lbmQnO1xuY29uc3QgT05FX1NFQ09ORCA9IDEwMDA7XG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50QW5pbWF0aW9uU3R5bGVIYW5kbGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfZXZlbnRGbjogKGU6IGFueSkgPT4gYW55O1xuICBwcml2YXRlIF9maW5pc2hlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9kZXN0cm95ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc3RhcnRUaW1lID0gMDtcbiAgcHJpdmF0ZSBfcG9zaXRpb24gPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBfZWxlbWVudDogYW55LCBwcml2YXRlIHJlYWRvbmx5IF9uYW1lOiBzdHJpbmcsXG4gICAgICBwcml2YXRlIHJlYWRvbmx5IF9kdXJhdGlvbjogbnVtYmVyLCBwcml2YXRlIHJlYWRvbmx5IF9kZWxheTogbnVtYmVyLFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBfZWFzaW5nOiBzdHJpbmcsIHByaXZhdGUgcmVhZG9ubHkgX2ZpbGxNb2RlOiAnJ3wnYm90aCd8J2ZvcndhcmRzJyxcbiAgICAgIHByaXZhdGUgcmVhZG9ubHkgX29uRG9uZUZuOiAoKSA9PiBhbnkpIHtcbiAgICB0aGlzLl9ldmVudEZuID0gKGUpID0+IHRoaXMuX2hhbmRsZUNhbGxiYWNrKGUpO1xuICB9XG5cbiAgYXBwbHkoKSB7XG4gICAgYXBwbHlLZXlmcmFtZUFuaW1hdGlvbihcbiAgICAgICAgdGhpcy5fZWxlbWVudCxcbiAgICAgICAgYCR7dGhpcy5fZHVyYXRpb259bXMgJHt0aGlzLl9lYXNpbmd9ICR7dGhpcy5fZGVsYXl9bXMgMSBub3JtYWwgJHt0aGlzLl9maWxsTW9kZX0gJHtcbiAgICAgICAgICAgIHRoaXMuX25hbWV9YCk7XG4gICAgYWRkUmVtb3ZlQW5pbWF0aW9uRXZlbnQodGhpcy5fZWxlbWVudCwgdGhpcy5fZXZlbnRGbiwgZmFsc2UpO1xuICAgIHRoaXMuX3N0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBwbGF5UGF1c2VBbmltYXRpb24odGhpcy5fZWxlbWVudCwgdGhpcy5fbmFtZSwgJ3BhdXNlZCcpO1xuICB9XG5cbiAgcmVzdW1lKCkge1xuICAgIHBsYXlQYXVzZUFuaW1hdGlvbih0aGlzLl9lbGVtZW50LCB0aGlzLl9uYW1lLCAncnVubmluZycpO1xuICB9XG5cbiAgc2V0UG9zaXRpb24ocG9zaXRpb246IG51bWJlcikge1xuICAgIGNvbnN0IGluZGV4ID0gZmluZEluZGV4Rm9yQW5pbWF0aW9uKHRoaXMuX2VsZW1lbnQsIHRoaXMuX25hbWUpO1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb24gKiB0aGlzLl9kdXJhdGlvbjtcbiAgICBzZXRBbmltYXRpb25TdHlsZSh0aGlzLl9lbGVtZW50LCAnRGVsYXknLCBgLSR7dGhpcy5fcG9zaXRpb259bXNgLCBpbmRleCk7XG4gIH1cblxuICBnZXRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVDYWxsYmFjayhldmVudDogYW55KSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gZXZlbnQuX25nVGVzdE1hbnVhbFRpbWVzdGFtcCB8fCBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGVsYXBzZWRUaW1lID1cbiAgICAgICAgcGFyc2VGbG9hdChldmVudC5lbGFwc2VkVGltZS50b0ZpeGVkKEVMQVBTRURfVElNRV9NQVhfREVDSU1BTF9QTEFDRVMpKSAqIE9ORV9TRUNPTkQ7XG4gICAgaWYgKGV2ZW50LmFuaW1hdGlvbk5hbWUgPT0gdGhpcy5fbmFtZSAmJlxuICAgICAgICBNYXRoLm1heCh0aW1lc3RhbXAgLSB0aGlzLl9zdGFydFRpbWUsIDApID49IHRoaXMuX2RlbGF5ICYmIGVsYXBzZWRUaW1lID49IHRoaXMuX2R1cmF0aW9uKSB7XG4gICAgICB0aGlzLmZpbmlzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmlzaCgpIHtcbiAgICBpZiAodGhpcy5fZmluaXNoZWQpIHJldHVybjtcbiAgICB0aGlzLl9maW5pc2hlZCA9IHRydWU7XG4gICAgdGhpcy5fb25Eb25lRm4oKTtcbiAgICBhZGRSZW1vdmVBbmltYXRpb25FdmVudCh0aGlzLl9lbGVtZW50LCB0aGlzLl9ldmVudEZuLCB0cnVlKTtcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2Rlc3Ryb3llZCkgcmV0dXJuO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gICAgdGhpcy5maW5pc2goKTtcbiAgICByZW1vdmVLZXlmcmFtZUFuaW1hdGlvbih0aGlzLl9lbGVtZW50LCB0aGlzLl9uYW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5UGF1c2VBbmltYXRpb24oZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIHN0YXR1czogJ3J1bm5pbmcnfCdwYXVzZWQnKSB7XG4gIGNvbnN0IGluZGV4ID0gZmluZEluZGV4Rm9yQW5pbWF0aW9uKGVsZW1lbnQsIG5hbWUpO1xuICBzZXRBbmltYXRpb25TdHlsZShlbGVtZW50LCAnUGxheVN0YXRlJywgc3RhdHVzLCBpbmRleCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5S2V5ZnJhbWVBbmltYXRpb24oZWxlbWVudDogYW55LCB2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgYW5pbSA9IGdldEFuaW1hdGlvblN0eWxlKGVsZW1lbnQsICcnKS50cmltKCk7XG4gIGxldCBpbmRleCA9IDA7XG4gIGlmIChhbmltLmxlbmd0aCkge1xuICAgIGluZGV4ID0gY291bnRDaGFycyhhbmltLCAnLCcpICsgMTtcbiAgICB2YWx1ZSA9IGAke2FuaW19LCAke3ZhbHVlfWA7XG4gIH1cbiAgc2V0QW5pbWF0aW9uU3R5bGUoZWxlbWVudCwgJycsIHZhbHVlKTtcbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiByZW1vdmVLZXlmcmFtZUFuaW1hdGlvbihlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZykge1xuICBjb25zdCBhbmltID0gZ2V0QW5pbWF0aW9uU3R5bGUoZWxlbWVudCwgJycpO1xuICBjb25zdCB0b2tlbnMgPSBhbmltLnNwbGl0KCcsJyk7XG4gIGNvbnN0IGluZGV4ID0gZmluZE1hdGNoaW5nVG9rZW5JbmRleCh0b2tlbnMsIG5hbWUpO1xuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIHRva2Vucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gdG9rZW5zLmpvaW4oJywnKTtcbiAgICBzZXRBbmltYXRpb25TdHlsZShlbGVtZW50LCAnJywgbmV3VmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRJbmRleEZvckFuaW1hdGlvbihlbGVtZW50OiBhbnksIHZhbHVlOiBzdHJpbmcpIHtcbiAgY29uc3QgYW5pbSA9IGdldEFuaW1hdGlvblN0eWxlKGVsZW1lbnQsICcnKTtcbiAgaWYgKGFuaW0uaW5kZXhPZignLCcpID4gMCkge1xuICAgIGNvbnN0IHRva2VucyA9IGFuaW0uc3BsaXQoJywnKTtcbiAgICByZXR1cm4gZmluZE1hdGNoaW5nVG9rZW5JbmRleCh0b2tlbnMsIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmluZE1hdGNoaW5nVG9rZW5JbmRleChbYW5pbV0sIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZmluZE1hdGNoaW5nVG9rZW5JbmRleCh0b2tlbnM6IHN0cmluZ1tdLCBzZWFyY2hUb2tlbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodG9rZW5zW2ldLmluZGV4T2Yoc2VhcmNoVG9rZW4pID49IDApIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGFkZFJlbW92ZUFuaW1hdGlvbkV2ZW50KGVsZW1lbnQ6IGFueSwgZm46IChlOiBhbnkpID0+IGFueSwgZG9SZW1vdmU6IGJvb2xlYW4pIHtcbiAgZG9SZW1vdmUgPyBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoQU5JTUFUSU9ORU5EX0VWRU5ULCBmbikgOlxuICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihBTklNQVRJT05FTkRfRVZFTlQsIGZuKTtcbn1cblxuZnVuY3Rpb24gc2V0QW5pbWF0aW9uU3R5bGUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGluZGV4PzogbnVtYmVyKSB7XG4gIGNvbnN0IHByb3AgPSBBTklNQVRJT05fUFJPUCArIG5hbWU7XG4gIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSBlbGVtZW50LnN0eWxlW3Byb3BdO1xuICAgIGlmIChvbGRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHRva2VucyA9IG9sZFZhbHVlLnNwbGl0KCcsJyk7XG4gICAgICB0b2tlbnNbaW5kZXhdID0gdmFsdWU7XG4gICAgICB2YWx1ZSA9IHRva2Vucy5qb2luKCcsJyk7XG4gICAgfVxuICB9XG4gIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uU3R5bGUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGVsZW1lbnQuc3R5bGVbQU5JTUFUSU9OX1BST1AgKyBuYW1lXTtcbn1cblxuZnVuY3Rpb24gY291bnRDaGFycyh2YWx1ZTogc3RyaW5nLCBjaGFyOiBzdHJpbmcpOiBudW1iZXIge1xuICBsZXQgY291bnQgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYyA9IHZhbHVlLmNoYXJBdChpKTtcbiAgICBpZiAoYyA9PT0gY2hhcikgY291bnQrKztcbiAgfVxuICByZXR1cm4gY291bnQ7XG59XG4iXX0=