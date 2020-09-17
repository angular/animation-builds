/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { Animation as ɵAnimation } from './dsl/animation';
export { AnimationStyleNormalizer as ɵAnimationStyleNormalizer, NoopAnimationStyleNormalizer as ɵNoopAnimationStyleNormalizer } from './dsl/style_normalization/animation_style_normalizer';
export { WebAnimationsStyleNormalizer as ɵWebAnimationsStyleNormalizer } from './dsl/style_normalization/web_animations_style_normalizer';
export { NoopAnimationDriver as ɵNoopAnimationDriver } from './render/animation_driver';
export { AnimationEngine as ɵAnimationEngine } from './render/animation_engine_next';
export { CssKeyframesDriver as ɵCssKeyframesDriver } from './render/css_keyframes/css_keyframes_driver';
export { CssKeyframesPlayer as ɵCssKeyframesPlayer } from './render/css_keyframes/css_keyframes_player';
export { containsElement as ɵcontainsElement, invokeQuery as ɵinvokeQuery, matchesElement as ɵmatchesElement, validateStyleProperty as ɵvalidateStyleProperty } from './render/shared';
export { supportsWebAnimations as ɵsupportsWebAnimations, WebAnimationsDriver as ɵWebAnimationsDriver } from './render/web_animations/web_animations_driver';
export { WebAnimationsPlayer as ɵWebAnimationsPlayer } from './render/web_animations/web_animations_player';
export { allowPreviousPlayerStylesMerge as ɵallowPreviousPlayerStylesMerge } from './util';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9leHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL3ByaXZhdGVfZXhwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBQyxTQUFTLElBQUksVUFBVSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHdCQUF3QixJQUFJLHlCQUF5QixFQUFFLDRCQUE0QixJQUFJLDZCQUE2QixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDMUwsT0FBTyxFQUFDLDRCQUE0QixJQUFJLDZCQUE2QixFQUFDLE1BQU0sMkRBQTJELENBQUM7QUFDeEksT0FBTyxFQUFDLG1CQUFtQixJQUFJLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEYsT0FBTyxFQUFDLGVBQWUsSUFBSSxnQkFBZ0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ25GLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxtQkFBbUIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RHLE9BQU8sRUFBQyxrQkFBa0IsSUFBSSxtQkFBbUIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RHLE9BQU8sRUFBQyxlQUFlLElBQUksZ0JBQWdCLEVBQUUsV0FBVyxJQUFJLFlBQVksRUFBRSxjQUFjLElBQUksZUFBZSxFQUFFLHFCQUFxQixJQUFJLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDckwsT0FBTyxFQUFDLHFCQUFxQixJQUFJLHNCQUFzQixFQUFFLG1CQUFtQixJQUFJLG9CQUFvQixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFDM0osT0FBTyxFQUFDLG1CQUFtQixJQUFJLG9CQUFvQixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFDMUcsT0FBTyxFQUFDLDhCQUE4QixJQUFJLCtCQUErQixFQUFDLE1BQU0sUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5leHBvcnQge0FuaW1hdGlvbiBhcyDJtUFuaW1hdGlvbn0gZnJvbSAnLi9kc2wvYW5pbWF0aW9uJztcbmV4cG9ydCB7QW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyIGFzIMm1QW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyLCBOb29wQW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyIGFzIMm1Tm9vcEFuaW1hdGlvblN0eWxlTm9ybWFsaXplcn0gZnJvbSAnLi9kc2wvc3R5bGVfbm9ybWFsaXphdGlvbi9hbmltYXRpb25fc3R5bGVfbm9ybWFsaXplcic7XG5leHBvcnQge1dlYkFuaW1hdGlvbnNTdHlsZU5vcm1hbGl6ZXIgYXMgybVXZWJBbmltYXRpb25zU3R5bGVOb3JtYWxpemVyfSBmcm9tICcuL2RzbC9zdHlsZV9ub3JtYWxpemF0aW9uL3dlYl9hbmltYXRpb25zX3N0eWxlX25vcm1hbGl6ZXInO1xuZXhwb3J0IHtOb29wQW5pbWF0aW9uRHJpdmVyIGFzIMm1Tm9vcEFuaW1hdGlvbkRyaXZlcn0gZnJvbSAnLi9yZW5kZXIvYW5pbWF0aW9uX2RyaXZlcic7XG5leHBvcnQge0FuaW1hdGlvbkVuZ2luZSBhcyDJtUFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnLi9yZW5kZXIvYW5pbWF0aW9uX2VuZ2luZV9uZXh0JztcbmV4cG9ydCB7Q3NzS2V5ZnJhbWVzRHJpdmVyIGFzIMm1Q3NzS2V5ZnJhbWVzRHJpdmVyfSBmcm9tICcuL3JlbmRlci9jc3Nfa2V5ZnJhbWVzL2Nzc19rZXlmcmFtZXNfZHJpdmVyJztcbmV4cG9ydCB7Q3NzS2V5ZnJhbWVzUGxheWVyIGFzIMm1Q3NzS2V5ZnJhbWVzUGxheWVyfSBmcm9tICcuL3JlbmRlci9jc3Nfa2V5ZnJhbWVzL2Nzc19rZXlmcmFtZXNfcGxheWVyJztcbmV4cG9ydCB7Y29udGFpbnNFbGVtZW50IGFzIMm1Y29udGFpbnNFbGVtZW50LCBpbnZva2VRdWVyeSBhcyDJtWludm9rZVF1ZXJ5LCBtYXRjaGVzRWxlbWVudCBhcyDJtW1hdGNoZXNFbGVtZW50LCB2YWxpZGF0ZVN0eWxlUHJvcGVydHkgYXMgybV2YWxpZGF0ZVN0eWxlUHJvcGVydHl9IGZyb20gJy4vcmVuZGVyL3NoYXJlZCc7XG5leHBvcnQge3N1cHBvcnRzV2ViQW5pbWF0aW9ucyBhcyDJtXN1cHBvcnRzV2ViQW5pbWF0aW9ucywgV2ViQW5pbWF0aW9uc0RyaXZlciBhcyDJtVdlYkFuaW1hdGlvbnNEcml2ZXJ9IGZyb20gJy4vcmVuZGVyL3dlYl9hbmltYXRpb25zL3dlYl9hbmltYXRpb25zX2RyaXZlcic7XG5leHBvcnQge1dlYkFuaW1hdGlvbnNQbGF5ZXIgYXMgybVXZWJBbmltYXRpb25zUGxheWVyfSBmcm9tICcuL3JlbmRlci93ZWJfYW5pbWF0aW9ucy93ZWJfYW5pbWF0aW9uc19wbGF5ZXInO1xuZXhwb3J0IHthbGxvd1ByZXZpb3VzUGxheWVyU3R5bGVzTWVyZ2UgYXMgybVhbGxvd1ByZXZpb3VzUGxheWVyU3R5bGVzTWVyZ2V9IGZyb20gJy4vdXRpbCc7XG4iXX0=