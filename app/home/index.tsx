import React, {
  LegacyRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import products from "@/json/products.json";
import Card from "../../components/Card";
import { ThemedSafeAreaView } from "@/components";

type ProductProps = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

interface ProductRefProps extends ProductProps {
  ref: LegacyRef<null>;
}

const StackSweepableCards: React.FC = () => {
  const [index, setIndex] = useState(0);
  const cards = useRef<ProductRefProps[]>([]);
  const [dummy, setDummy] = useState(0); // Dummy state to force re-render

  useLayoutEffect(() => {
    if (cards.current.length <= 5) {
      initProductRef();
      console.log("oui");
      setDummy(dummy + 1);
    }
  }, [cards.current]);

  function initProductRef() {
    const productsRef: ProductRefProps[] = products.map(
      (product: ProductProps) => ({
        ...product,
        ref: React.createRef(),
      })
    );
    cards.current = productsRef;
  }

  if (cards.current.length <= 0) return;

  return (
    <ThemedSafeAreaView
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      {cards?.current
        .slice(index, index + 5)
        .reverse()
        .map((product) => (
          <Card
            key={product.id}
            id={product.id}
            ref={product.ref}
            image={product.image}
            title={product.title}
            action={() => setIndex(index + 1)}
          />
        ))}
    </ThemedSafeAreaView>
  );
};

export default StackSweepableCards;
