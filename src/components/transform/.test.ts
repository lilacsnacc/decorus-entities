import { defaultTransform, Transform } from ".";

test('Transform', () => {
  const entity = { id: 'derp' }
  Transform.set(entity, defaultTransform)

  expect(Transform.get(entity)).toBe(defaultTransform)
})