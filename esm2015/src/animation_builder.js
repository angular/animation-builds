/**
 * An injectable service that produces an animation sequence programmatically within an
 * Angular component or directive.
 * Provided by the `BrowserAnimationsModule` or `NoopAnimationsModule`.
 *
 * @usageNotes
 *
 * To use this service, add it to your component or directive as a dependency.
 * The service is instantiated along with your component.
 *
 * Apps do not typically need to create their own animation players, but if you
 * do need to, follow these steps:
 *
 * 1. Use the `build()` method to create a programmatic animation using the
 * `animate()` function. The method returns an `AnimationFactory` instance.
 *
 * 2. Use the factory object to create an `AnimationPlayer` and attach it to a DOM element.
 *
 * 3. Use the player object to control the animation programmatically.
 *
 * For example:
 *
 * ```ts
 * // import the service from BrowserAnimationsModule
 * import {AnimationBuilder} from '@angular/animations';
 * // require the service as a dependency
 * class MyCmp {
 *   constructor(private _builder: AnimationBuilder) {}
 *
 *   makeAnimation(element: any) {
 *     // first define a reusable animation
 *     const myAnimation = this._builder.build([
 *       style({ width: 0 }),
 *       animate(1000, style({ width: '100px' }))
 *     ]);
 *
 *     // use the returned factory object to create a player
 *     const player = myAnimation.create(element);
 *
 *     player.play();
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export class AnimationBuilder {
}
/**
 * A factory object returned from the `AnimationBuilder`.`build()` method.
 *
 * @publicApi
 */
export class AnimationFactory {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL3NyYy9hbmltYXRpb25fYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNHO0FBQ0gsTUFBTSxPQUFnQixnQkFBZ0I7Q0FRckM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFnQixnQkFBZ0I7Q0FVckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvbk1ldGFkYXRhLCBBbmltYXRpb25PcHRpb25zfSBmcm9tICcuL2FuaW1hdGlvbl9tZXRhZGF0YSc7XG5pbXBvcnQge0FuaW1hdGlvblBsYXllcn0gZnJvbSAnLi9wbGF5ZXJzL2FuaW1hdGlvbl9wbGF5ZXInO1xuXG4vKipcbiAqIEFuIGluamVjdGFibGUgc2VydmljZSB0aGF0IHByb2R1Y2VzIGFuIGFuaW1hdGlvbiBzZXF1ZW5jZSBwcm9ncmFtbWF0aWNhbGx5IHdpdGhpbiBhblxuICogQW5ndWxhciBjb21wb25lbnQgb3IgZGlyZWN0aXZlLlxuICogUHJvdmlkZWQgYnkgdGhlIGBCcm93c2VyQW5pbWF0aW9uc01vZHVsZWAgb3IgYE5vb3BBbmltYXRpb25zTW9kdWxlYC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRvIHVzZSB0aGlzIHNlcnZpY2UsIGFkZCBpdCB0byB5b3VyIGNvbXBvbmVudCBvciBkaXJlY3RpdmUgYXMgYSBkZXBlbmRlbmN5LlxuICogVGhlIHNlcnZpY2UgaXMgaW5zdGFudGlhdGVkIGFsb25nIHdpdGggeW91ciBjb21wb25lbnQuXG4gKlxuICogQXBwcyBkbyBub3QgdHlwaWNhbGx5IG5lZWQgdG8gY3JlYXRlIHRoZWlyIG93biBhbmltYXRpb24gcGxheWVycywgYnV0IGlmIHlvdVxuICogZG8gbmVlZCB0bywgZm9sbG93IHRoZXNlIHN0ZXBzOlxuICpcbiAqIDEuIFVzZSB0aGUgYGJ1aWxkKClgIG1ldGhvZCB0byBjcmVhdGUgYSBwcm9ncmFtbWF0aWMgYW5pbWF0aW9uIHVzaW5nIHRoZVxuICogYGFuaW1hdGUoKWAgZnVuY3Rpb24uIFRoZSBtZXRob2QgcmV0dXJucyBhbiBgQW5pbWF0aW9uRmFjdG9yeWAgaW5zdGFuY2UuXG4gKlxuICogMi4gVXNlIHRoZSBmYWN0b3J5IG9iamVjdCB0byBjcmVhdGUgYW4gYEFuaW1hdGlvblBsYXllcmAgYW5kIGF0dGFjaCBpdCB0byBhIERPTSBlbGVtZW50LlxuICpcbiAqIDMuIFVzZSB0aGUgcGxheWVyIG9iamVjdCB0byBjb250cm9sIHRoZSBhbmltYXRpb24gcHJvZ3JhbW1hdGljYWxseS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0c1xuICogLy8gaW1wb3J0IHRoZSBzZXJ2aWNlIGZyb20gQnJvd3NlckFuaW1hdGlvbnNNb2R1bGVcbiAqIGltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG4gKiAvLyByZXF1aXJlIHRoZSBzZXJ2aWNlIGFzIGEgZGVwZW5kZW5jeVxuICogY2xhc3MgTXlDbXAge1xuICogICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9idWlsZGVyOiBBbmltYXRpb25CdWlsZGVyKSB7fVxuICpcbiAqICAgbWFrZUFuaW1hdGlvbihlbGVtZW50OiBhbnkpIHtcbiAqICAgICAvLyBmaXJzdCBkZWZpbmUgYSByZXVzYWJsZSBhbmltYXRpb25cbiAqICAgICBjb25zdCBteUFuaW1hdGlvbiA9IHRoaXMuX2J1aWxkZXIuYnVpbGQoW1xuICogICAgICAgc3R5bGUoeyB3aWR0aDogMCB9KSxcbiAqICAgICAgIGFuaW1hdGUoMTAwMCwgc3R5bGUoeyB3aWR0aDogJzEwMHB4JyB9KSlcbiAqICAgICBdKTtcbiAqXG4gKiAgICAgLy8gdXNlIHRoZSByZXR1cm5lZCBmYWN0b3J5IG9iamVjdCB0byBjcmVhdGUgYSBwbGF5ZXJcbiAqICAgICBjb25zdCBwbGF5ZXIgPSBteUFuaW1hdGlvbi5jcmVhdGUoZWxlbWVudCk7XG4gKlxuICogICAgIHBsYXllci5wbGF5KCk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFuaW1hdGlvbkJ1aWxkZXIge1xuICAvKipcbiAgICogQnVpbGRzIGEgZmFjdG9yeSBmb3IgcHJvZHVjaW5nIGEgZGVmaW5lZCBhbmltYXRpb24uXG4gICAqIEBwYXJhbSBhbmltYXRpb24gQSByZXVzYWJsZSBhbmltYXRpb24gZGVmaW5pdGlvbi5cbiAgICogQHJldHVybnMgQSBmYWN0b3J5IG9iamVjdCB0aGF0IGNhbiBjcmVhdGUgYSBwbGF5ZXIgZm9yIHRoZSBkZWZpbmVkIGFuaW1hdGlvbi5cbiAgICogQHNlZSBgYW5pbWF0ZSgpYFxuICAgKi9cbiAgYWJzdHJhY3QgYnVpbGQoYW5pbWF0aW9uOiBBbmltYXRpb25NZXRhZGF0YXxBbmltYXRpb25NZXRhZGF0YVtdKTogQW5pbWF0aW9uRmFjdG9yeTtcbn1cblxuLyoqXG4gKiBBIGZhY3Rvcnkgb2JqZWN0IHJldHVybmVkIGZyb20gdGhlIGBBbmltYXRpb25CdWlsZGVyYC5gYnVpbGQoKWAgbWV0aG9kLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFuaW1hdGlvbkZhY3Rvcnkge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBgQW5pbWF0aW9uUGxheWVyYCBpbnN0YW5jZSBmb3IgdGhlIHJldXNhYmxlIGFuaW1hdGlvbiBkZWZpbmVkIGJ5XG4gICAqIHRoZSBgQW5pbWF0aW9uQnVpbGRlcmAuYGJ1aWxkKClgIG1ldGhvZCB0aGF0IGNyZWF0ZWQgdGhpcyBmYWN0b3J5LlxuICAgKiBBdHRhY2hlcyB0aGUgbmV3IHBsYXllciBhIERPTSBlbGVtZW50LlxuICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgRE9NIGVsZW1lbnQgdG8gd2hpY2ggdG8gYXR0YWNoIHRoZSBhbmltYXRpb24uXG4gICAqIEBwYXJhbSBvcHRpb25zIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjYW4gaW5jbHVkZSBhIHRpbWUgZGVsYXkgYW5kXG4gICAqIGFkZGl0aW9uYWwgZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycy5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZShlbGVtZW50OiBhbnksIG9wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uUGxheWVyO1xufVxuIl19