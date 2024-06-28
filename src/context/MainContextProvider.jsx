import React from "react";
import GlobalState from "./state/GlobalState";
import ThemeState from "./state/ThemeState";
import AuthState from "./state/AuthState";
import ProductCategoryState from "./state/ProductCategoryState";
import ProductState from "./state/ProductState";
import AttributeState from "./state/AttributeState";
import ImageState from "./state/ImageState";

const MainContextProvider = ({ children }) => {
  return (
    <GlobalState>
      <ThemeState>
        <AuthState>
          <ProductCategoryState>
            <ProductState>
              <ImageState>
                  <AttributeState>{children}</AttributeState>
              </ImageState>
            </ProductState>
          </ProductCategoryState>
        </AuthState>
      </ThemeState>
    </GlobalState>
  );
};

export default MainContextProvider;
