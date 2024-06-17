import React from "react";
import GlobalState from "./state/GlobalState";
import ThemeState from "./state/ThemeState";
import AuthState from "./state/AuthState";
import ProductCategoryState from "./state/ProductCategoryState";
import ProductState from "./state/ProductState";
import SizeState from "./state/SizeState";
import ColorAndSizeState from "./state/ColorAndSizeState";
import ImageState from "./state/ImageState";

const MainContextProvider = ({ children }) => {
  return (
    <GlobalState>
      <ThemeState>
        <AuthState>
          <ProductCategoryState>
            <ProductState>
              <ImageState>
                <SizeState>
                  <ColorAndSizeState>{children}</ColorAndSizeState>
                </SizeState>
              </ImageState>
            </ProductState>
          </ProductCategoryState>
        </AuthState>
      </ThemeState>
    </GlobalState>
  );
};

export default MainContextProvider;
