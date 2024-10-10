import React, { useRef } from "react";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { ThemedText } from "@/components";
import categoriesData from "@/json/categories.json";
import ListItem from "./ListItem";

interface CategoryProps {
  id: number;
  name: string;
}

const Header: React.FC = () => (
  <ThemedText type="subtitle">Choose categories that you enjoy</ThemedText>
);

const CategorieForm: React.FC = () => {
  const masonryFlashListRef = useRef<FlashList<number>>(null);
  const renderItem = ({ item }: { item: CategoryProps }) => {
    return <ListItem item={item} />;
  };

  return (
    <MasonryFlashList
      ref={masonryFlashListRef}
      numColumns={2}
      keyExtractor={(item: CategoryProps) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      estimatedItemSize={150}
      stickyHeaderIndices={[0, 3, 6, 7, 9]}
      data={categoriesData.categories}
      ListHeaderComponent={<Header />}
    />
  );
};

export default CategorieForm;
