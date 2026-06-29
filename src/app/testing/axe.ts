import axe from 'axe-core';

export async function expectNoAxeViolations(element: Element): Promise<void> {
  const results = await axe.run(element);

  expect(results.violations).toEqual([]);
}
