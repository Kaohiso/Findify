import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { ThemedText } from "@/components";
import categoriesData from "@/json/categories.json";
import ListItem from "./ListItem";
import { LikedCategoriesProvider } from "@/context/likedCategoriesContext";

interface CategoryProps {
  id: number;
  name: string;
}
interface CategoryFormProps {
  onValidationChange: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC = () => (
  <ThemedText type="subtitle">Choose categories that you enjoy</ThemedText>
);

const CategorieForm: React.FC<CategoryFormProps> = ({ onValidationChange }) => {
  const [data] = useState<CategoryProps[]>(categoriesData.categories);
  const masonryFlashListRef = useRef<FlashList<number>>(null);

  const renderItem = ({ item }: { item: CategoryProps }) => {
    return <ListItem item={item} />;
  };

  return (
    <LikedCategoriesProvider setIsValid={onValidationChange}>
      <MasonryFlashList
        ref={masonryFlashListRef}
        numColumns={2}
        keyExtractor={(item: CategoryProps) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        estimatedItemSize={150}
        data={data}
        ListHeaderComponent={<Header />}
      />
    </LikedCategoriesProvider>
  );
};

export default CategorieForm;
