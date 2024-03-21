import React from "react";
import GlobalState from "./state/GlobalState";
import ThemeState from "./state/ThemeState";
import AuthState from "./state/AuthState";
import ProductCategoryState from "./state/ProductCategoryState";
import ProductState from "./state/ProductState";
import ColorState from "./state/ColorState";
import SizeState from "./state/SizeState";
import ColorAndSizeState from "./state/ColorAndSizeState";

const MainContextProvider = ({ children }) => {
  return (
    <GlobalState>
      <ThemeState>
        <AuthState>
          <ProductCategoryState>
            <ProductState>
              <ColorState>
                <SizeState>
                  <ColorAndSizeState>{children}</ColorAndSizeState>
                </SizeState>
              </ColorState>
            </ProductState>
          </ProductCategoryState>
        </AuthState>
      </ThemeState>
    </GlobalState>
  );
};

export default MainContextProvider;
