import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";

interface LikedCategoriesContextProps {
  liked: number[];
  toggleLike: (id: number) => void;
  isLiked: (id: number) => boolean;
}

const LikedCategoriesContext =
  createContext<LikedCategoriesContextProps | null>(null);

export const useLikedCategories = () => {
  const context = useContext(LikedCategoriesContext);
  if (!context) {
    throw new Error(
      "useLikedCategories must be used within a LikedCategoriesProvider"
    );
  }
  return context;
};

interface LikedCategoriesProviderProps {
  children: ReactNode;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}

export const LikedCategoriesProvider: React.FC<
  LikedCategoriesProviderProps
> = ({ children, setIsValid }) => {
  const [liked, setLiked] = useState<number[]>([]);

  useEffect(() => {
    if (liked.length >= 5) setIsValid(true);
    else setIsValid(false);
  }, [liked]);

  const toggleLike = useCallback(
    (id: number) => {
      setLiked((prevLiked) => {
        if (prevLiked.includes(id))
          return prevLiked.filter((likedId) => likedId !== id);
        else return [...prevLiked, id];
      });
    },
    [setLiked]
  );

  const isLiked = useCallback(
    (id: number) => {
      return liked.includes(id);
    },
    [liked]
  );

  return (
    <LikedCategoriesContext.Provider value={{ liked, toggleLike, isLiked }}>
      {children}
    </LikedCategoriesContext.Provider>
  );
};
