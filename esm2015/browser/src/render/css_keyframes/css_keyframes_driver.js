import { allowPreviousPlayerStylesMerge, balancePreviousStylesIntoKeyframes } from '../../util';
import { containsElement, hypenatePropsObject, invokeQuery, matchesElement, validateStyleProperty } from '../shared';
import { packageNonAnimatableStyles } from '../special_cased_styles';
import { CssKeyframesPlayer } from './css_keyframes_player';
import { DirectStylePlayer } from './direct_style_player';
const KEYFRAMES_NAME_PREFIX = 'gen_css_kf_';
const TAB_SPACE = ' ';
export class CssKeyframesDriver {
    constructor() {
        this._count = 0;
        this._head = document.querySelector('head');
    }
    validateStyleProperty(prop) {
        return validateStyleProperty(prop);
    }
    matchesElement(element, selector) {
        return matchesElement(element, selector);
    }
    containsElement(elm1, elm2) {
        return containsElement(elm1, elm2);
    }
    query(element, selector, multi) {
        return invokeQuery(element, selector, multi);
    }
    computeStyle(element, prop, defaultValue) {
        return window.getComputedStyle(element)[prop];
    }
    buildKeyframeElement(element, name, keyframes) {
        keyframes = keyframes.map(kf => hypenatePropsObject(kf));
        let keyframeStr = `@keyframes ${name} {\n`;
        let tab = '';
        keyframes.forEach(kf => {
            tab = TAB_SPACE;
            const offset = parseFloat(kf['offset']);
            keyframeStr += `${tab}${offset * 100}% {\n`;
            tab += TAB_SPACE;
            Object.keys(kf).forEach(prop => {
                const value = kf[prop];
                switch (prop) {
                    case 'offset':
                        return;
                    case 'easing':
                        if (value) {
                            keyframeStr += `${tab}animation-timing-function: ${value};\n`;
                        }
                        return;
                    default:
                        keyframeStr += `${tab}${prop}: ${value};\n`;
                        return;
                }
            });
            keyframeStr += `${tab}}\n`;
        });
        keyframeStr += `}\n`;
        const kfElm = document.createElement('style');
        kfElm.textContent = keyframeStr;
        return kfElm;
    }
    animate(element, keyframes, duration, delay, easing, previousPlayers = [], scrubberAccessRequested) {
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && scrubberAccessRequested) {
            notifyFaultyScrubber();
        }
        const previousCssKeyframePlayers = previousPlayers.filter(player => player instanceof CssKeyframesPlayer);
        const previousStyles = {};
        if (allowPreviousPlayerStylesMerge(duration, delay)) {
            previousCssKeyframePlayers.forEach(player => {
                let styles = player.currentSnapshot;
                Object.keys(styles).forEach(prop => previousStyles[prop] = styles[prop]);
            });
        }
        keyframes = balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles);
        const finalStyles = flattenKeyframesIntoStyles(keyframes);
        // if there is no animation then there is no point in applying
        // styles and waiting for an event to get fired. This causes lag.
        // It's better to just directly apply the styles to the element
        // via the direct styling animation player.
        if (duration == 0) {
            return new DirectStylePlayer(element, finalStyles);
        }
        const animationName = `${KEYFRAMES_NAME_PREFIX}${this._count++}`;
        const kfElm = this.buildKeyframeElement(element, animationName, keyframes);
        document.querySelector('head').appendChild(kfElm);
        const specialStyles = packageNonAnimatableStyles(element, keyframes);
        const player = new CssKeyframesPlayer(element, keyframes, animationName, duration, delay, easing, finalStyles, specialStyles);
        player.onDestroy(() => removeElement(kfElm));
        return player;
    }
}
function flattenKeyframesIntoStyles(keyframes) {
    let flatKeyframes = {};
    if (keyframes) {
        const kfs = Array.isArray(keyframes) ? keyframes : [keyframes];
        kfs.forEach(kf => {
            Object.keys(kf).forEach(prop => {
                if (prop == 'offset' || prop == 'easing')
                    return;
                flatKeyframes[prop] = kf[prop];
            });
        });
    }
    return flatKeyframes;
}
function removeElement(node) {
    node.parentNode.removeChild(node);
}
let warningIssued = false;
function notifyFaultyScrubber() {
    if (warningIssued)
        return;
    console.warn('@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n', '  visit https://bit.ly/IWukam to learn more about using the web-animation-js polyfill.');
    warningIssued = true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2tleWZyYW1lc19kcml2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL3JlbmRlci9jc3Nfa2V5ZnJhbWVzL2Nzc19rZXlmcmFtZXNfZHJpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBQyw4QkFBOEIsRUFBRSxrQ0FBa0MsRUFBZSxNQUFNLFlBQVksQ0FBQztBQUU1RyxPQUFPLEVBQUMsZUFBZSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbkgsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFbkUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQsTUFBTSxxQkFBcUIsR0FBRyxhQUFhLENBQUM7QUFDNUMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBRXRCLE1BQU0sT0FBTyxrQkFBa0I7SUFBL0I7UUFDVSxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ0YsVUFBSyxHQUFRLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFnRy9ELENBQUM7SUE5RkMscUJBQXFCLENBQUMsSUFBWTtRQUNoQyxPQUFPLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxjQUFjLENBQUMsT0FBWSxFQUFFLFFBQWdCO1FBQzNDLE9BQU8sY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZUFBZSxDQUFDLElBQVMsRUFBRSxJQUFTO1FBQ2xDLE9BQU8sZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxD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Q0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM3QixJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVE7b0JBQUUsT0FBTztnQkFDakQsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsSUFBUztJQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFNBQVMsb0JBQW9CO0lBQzNCLElBQUksYUFBYTtRQUFFLE9BQU87SUFDMUIsT0FBTyxDQUFDLElBQUksQ0FDUixtR0FBbUcsRUFDbkcsd0ZBQXdGLENBQUMsQ0FBQztJQUM5RixhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uUGxheWVyLCDJtVN0eWxlRGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7YWxsb3dQcmV2aW91c1BsYXllclN0eWxlc01lcmdlLCBiYWxhbmNlUHJldmlvdXNTdHlsZXNJbnRvS2V5ZnJhbWVzLCBjb21wdXRlU3R5bGV9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtBbmltYXRpb25Ecml2ZXJ9IGZyb20gJy4uL2FuaW1hdGlvbl9kcml2ZXInO1xuaW1wb3J0IHtjb250YWluc0VsZW1lbnQsIGh5cGVuYXRlUHJvcHNPYmplY3QsIGludm9rZVF1ZXJ5LCBtYXRjaGVzRWxlbWVudCwgdmFsaWRhdGVTdHlsZVByb3BlcnR5fSBmcm9tICcuLi9zaGFyZWQnO1xuaW1wb3J0IHtwYWNrYWdlTm9uQW5pbWF0YWJsZVN0eWxlc30gZnJvbSAnLi4vc3BlY2lhbF9jYXNlZF9zdHlsZXMnO1xuXG5pbXBvcnQge0Nzc0tleWZyYW1lc1BsYXllcn0gZnJvbSAnLi9jc3Nfa2V5ZnJhbWVzX3BsYXllcic7XG5pbXBvcnQge0RpcmVjdFN0eWxlUGxheWVyfSBmcm9tICcuL2RpcmVjdF9zdHlsZV9wbGF5ZXInO1xuXG5jb25zdCBLRVlGUkFNRVNfTkFNRV9QUkVGSVggPSAnZ2VuX2Nzc19rZl8nO1xuY29uc3QgVEFCX1NQQUNFID0gJyAnO1xuXG5leHBvcnQgY2xhc3MgQ3NzS2V5ZnJhbWVzRHJpdmVyIGltcGxlbWVudHMgQW5pbWF0aW9uRHJpdmVyIHtcbiAgcHJpdmF0ZSBfY291bnQgPSAwO1xuICBwcml2YXRlIHJlYWRvbmx5IF9oZWFkOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk7XG5cbiAgdmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3A6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWxpZGF0ZVN0eWxlUHJvcGVydHkocHJvcCk7XG4gIH1cblxuICBtYXRjaGVzRWxlbWVudChlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWF0Y2hlc0VsZW1lbnQoZWxlbWVudCwgc2VsZWN0b3IpO1xuICB9XG5cbiAgY29udGFpbnNFbGVtZW50KGVsbTE6IGFueSwgZWxtMjogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbnRhaW5zRWxlbWVudChlbG0xLCBlbG0yKTtcbiAgfVxuXG4gIHF1ZXJ5KGVsZW1lbnQ6IGFueSwgc2VsZWN0b3I6IHN0cmluZywgbXVsdGk6IGJvb2xlYW4pOiBhbnlbXSB7XG4gICAgcmV0dXJuIGludm9rZVF1ZXJ5KGVsZW1lbnQsIHNlbGVjdG9yLCBtdWx0aSk7XG4gIH1cblxuICBjb21wdXRlU3R5bGUoZWxlbWVudDogYW55LCBwcm9wOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSBhcyBhbnkpW3Byb3BdIGFzIHN0cmluZztcbiAgfVxuXG4gIGJ1aWxkS2V5ZnJhbWVFbGVtZW50KGVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBrZXlmcmFtZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9W10pOiBhbnkge1xuICAgIGtleWZyYW1lcyA9IGtleWZyYW1lcy5tYXAoa2YgPT4gaHlwZW5hdGVQcm9wc09iamVjdChrZikpO1xuICAgIGxldCBrZXlmcmFtZVN0ciA9IGBAa2V5ZnJhbWVzICR7bmFtZX0ge1xcbmA7XG4gICAgbGV0IHRhYiA9ICcnO1xuICAgIGtleWZyYW1lcy5mb3JFYWNoKGtmID0+IHtcbiAgICAgIHRhYiA9IFRBQl9TUEFDRTtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHBhcnNlRmxvYXQoa2ZbJ29mZnNldCddKTtcbiAgICAgIGtleWZyYW1lU3RyICs9IGAke3RhYn0ke29mZnNldCAqIDEwMH0lIHtcXG5gO1xuICAgICAgdGFiICs9IFRBQl9TUEFDRTtcbiAgICAgIE9iamVjdC5rZXlzKGtmKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGtmW3Byb3BdO1xuICAgICAgICBzd2l0Y2ggKHByb3ApIHtcbiAgICAgICAgICBjYXNlICdvZmZzZXQnOlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGNhc2UgJ2Vhc2luZyc6XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAga2V5ZnJhbWVTdHIgKz0gYCR7dGFifWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246ICR7dmFsdWV9O1xcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGtleWZyYW1lU3RyICs9IGAke3RhYn0ke3Byb3B9OiAke3ZhbHVlfTtcXG5gO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGtleWZyYW1lU3RyICs9IGAke3RhYn19XFxuYDtcbiAgICB9KTtcbiAgICBrZXlmcmFtZVN0ciArPSBgfVxcbmA7XG5cbiAgICBjb25zdCBrZkVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAga2ZFbG0udGV4dENvbnRlbnQgPSBrZXlmcmFtZVN0cjtcbiAgICByZXR1cm4ga2ZFbG07XG4gIH1cblxuICBhbmltYXRlKFxuICAgICAgZWxlbWVudDogYW55LCBrZXlmcmFtZXM6IMm1U3R5bGVEYXRhW10sIGR1cmF0aW9uOiBudW1iZXIsIGRlbGF5OiBudW1iZXIsIGVhc2luZzogc3RyaW5nLFxuICAgICAgcHJldmlvdXNQbGF5ZXJzOiBBbmltYXRpb25QbGF5ZXJbXSA9IFtdLCBzY3J1YmJlckFjY2Vzc1JlcXVlc3RlZD86IGJvb2xlYW4pOiBBbmltYXRpb25QbGF5ZXIge1xuICAgIGlmICgodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSAmJiBzY3J1YmJlckFjY2Vzc1JlcXVlc3RlZCkge1xuICAgICAgbm90aWZ5RmF1bHR5U2NydWJiZXIoKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c0Nzc0tleWZyYW1lUGxheWVycyA9IDxDc3NLZXlmcmFtZXNQbGF5ZXJbXT5wcmV2aW91c1BsYXllcnMuZmlsdGVyKFxuICAgICAgICBwbGF5ZXIgPT4gcGxheWVyIGluc3RhbmNlb2YgQ3NzS2V5ZnJhbWVzUGxheWVyKTtcblxuICAgIGNvbnN0IHByZXZpb3VzU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG4gICAgaWYgKGFsbG93UHJldmlvdXNQbGF5ZXJTdHlsZXNNZXJnZShkdXJhdGlvbiwgZGVsYXkpKSB7XG4gICAgICBwcmV2aW91c0Nzc0tleWZyYW1lUGxheWVycy5mb3JFYWNoKHBsYXllciA9PiB7XG4gICAgICAgIGxldCBzdHlsZXMgPSBwbGF5ZXIuY3VycmVudFNuYXBzaG90O1xuICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2gocHJvcCA9PiBwcmV2aW91c1N0eWxlc1twcm9wXSA9IHN0eWxlc1twcm9wXSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBrZXlmcmFtZXMgPSBiYWxhbmNlUHJldmlvdXNTdHlsZXNJbnRvS2V5ZnJhbWVzKGVsZW1lbnQsIGtleWZyYW1lcywgcHJldmlvdXNTdHlsZXMpO1xuICAgIGNvbnN0IGZpbmFsU3R5bGVzID0gZmxhdHRlbktleWZyYW1lc0ludG9TdHlsZXMoa2V5ZnJhbWVzKTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIGFuaW1hdGlvbiB0aGVuIHRoZXJlIGlzIG5vIHBvaW50IGluIGFwcGx5aW5nXG4gICAgLy8gc3R5bGVzIGFuZCB3YWl0aW5nIGZvciBhbiBldmVudCB0byBnZXQgZmlyZWQuIFRoaXMgY2F1c2VzIGxhZy5cbiAgICAvLyBJdCdzIGJldHRlciB0byBqdXN0IGRpcmVjdGx5IGFwcGx5IHRoZSBzdHlsZXMgdG8gdGhlIGVsZW1lbnRcbiAgICAvLyB2aWEgdGhlIGRpcmVjdCBzdHlsaW5nIGFuaW1hdGlvbiBwbGF5ZXIuXG4gICAgaWYgKGR1cmF0aW9uID09IDApIHtcbiAgICAgIHJldHVybiBuZXcgRGlyZWN0U3R5bGVQbGF5ZXIoZWxlbWVudCwgZmluYWxTdHlsZXMpO1xuICAgIH1cblxuICAgIGNvbnN0IGFuaW1hdGlvbk5hbWUgPSBgJHtLRVlGUkFNRVNfTkFNRV9QUkVGSVh9JHt0aGlzLl9jb3VudCsrfWA7XG4gICAgY29uc3Qga2ZFbG0gPSB0aGlzLmJ1aWxkS2V5ZnJhbWVFbGVtZW50KGVsZW1lbnQsIGFuaW1hdGlvbk5hbWUsIGtleWZyYW1lcyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpIS5hcHBlbmRDaGlsZChrZkVsbSk7XG5cbiAgICBjb25zdCBzcGVjaWFsU3R5bGVzID0gcGFja2FnZU5vbkFuaW1hdGFibGVTdHlsZXMoZWxlbWVudCwga2V5ZnJhbWVzKTtcbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgQ3NzS2V5ZnJhbWVzUGxheWVyKFxuICAgICAgICBlbGVtZW50LCBrZXlmcmFtZXMsIGFuaW1hdGlvbk5hbWUsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBmaW5hbFN0eWxlcywgc3BlY2lhbFN0eWxlcyk7XG5cbiAgICBwbGF5ZXIub25EZXN0cm95KCgpID0+IHJlbW92ZUVsZW1lbnQoa2ZFbG0pKTtcbiAgICByZXR1cm4gcGxheWVyO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5LZXlmcmFtZXNJbnRvU3R5bGVzKGtleWZyYW1lczogbnVsbHx7W2tleTogc3RyaW5nXTogYW55fXxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtba2V5OiBzdHJpbmddOiBhbnl9W10pOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGxldCBmbGF0S2V5ZnJhbWVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBpZiAoa2V5ZnJhbWVzKSB7XG4gICAgY29uc3Qga2ZzID0gQXJyYXkuaXNBcnJheShrZXlmcmFtZXMpID8ga2V5ZnJhbWVzIDogW2tleWZyYW1lc107XG4gICAga2ZzLmZvckVhY2goa2YgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoa2YpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIGlmIChwcm9wID09ICdvZmZzZXQnIHx8IHByb3AgPT0gJ2Vhc2luZycpIHJldHVybjtcbiAgICAgICAgZmxhdEtleWZyYW1lc1twcm9wXSA9IGtmW3Byb3BdO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGZsYXRLZXlmcmFtZXM7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQobm9kZTogYW55KSB7XG4gIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cblxubGV0IHdhcm5pbmdJc3N1ZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIG5vdGlmeUZhdWx0eVNjcnViYmVyKCk6IHZvaWQge1xuICBpZiAod2FybmluZ0lzc3VlZCkgcmV0dXJuO1xuICBjb25zb2xlLndhcm4oXG4gICAgICAnQGFuZ3VsYXIvYW5pbWF0aW9uczogcGxlYXNlIGxvYWQgdGhlIHdlYi1hbmltYXRpb25zLmpzIHBvbHlmaWxsIHRvIGFsbG93IHByb2dyYW1tYXRpYyBhY2Nlc3MuLi5cXG4nLFxuICAgICAgJyAgdmlzaXQgaHR0cHM6Ly9iaXQubHkvSVd1a2FtIHRvIGxlYXJuIG1vcmUgYWJvdXQgdXNpbmcgdGhlIHdlYi1hbmltYXRpb24tanMgcG9seWZpbGwuJyk7XG4gIHdhcm5pbmdJc3N1ZWQgPSB0cnVlO1xufVxuIl19