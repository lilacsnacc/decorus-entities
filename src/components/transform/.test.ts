import { Transform } from ".";

test('Transform', () => {
  const entity = new WeakSet()

  entity.add(Transform.set(entity, Transform.getDefault()))

  expect(Transform.get(entity)).toStrictEqual(Transform.getDefault())
})