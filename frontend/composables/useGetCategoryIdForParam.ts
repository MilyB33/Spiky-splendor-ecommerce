type UseGetCategoryIdForParamProps = {
  category: string | string[];
  subCategory: string | string[];
};

export const useGetCategoryIdForParam = ({
  category,
  subCategory,
}: UseGetCategoryIdForParamProps) => {
  const { categories } = useCategories();

  const categoryId = computed(() => {
    if (!categories.value?.length) return undefined;

    // TODO: change this as it should search by the handle. It should search by name (name is in polish but handle in english)
    const mainCategory = categories.value.find((cat) => cat.handle === category);

    const childrenCategory = mainCategory?.category_children.find(
      (cat) => cat.handle === subCategory,
    );

    return childrenCategory?.id;
  });

  return categoryId;
};
