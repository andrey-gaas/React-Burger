export default function converterIngredientsData(ingredientsList) {
  const data = [];
  const bun = ingredientsList.find(item => item.type === 'bun');

  if (bun) {
    data.push({
      ...bun,
      name: `${bun.name} (верх)`,
      key: `top-${bun._id}`,
    });
  }

  ingredientsList.forEach(item => {
    if (item.type === 'bun') return;
    data.push({ ...item, key: `${item._id}-${Math.random()}` });
  });

  if (bun) {
    data.push({
      ...bun,
      name: `${bun.name} (низ)`,
      key: `bottom-${bun._id}`,
    });
  }

  return data;
}
