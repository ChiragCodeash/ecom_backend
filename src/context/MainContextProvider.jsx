import React from "react";
import GlobalState from "./state/GlobalState";
import ThemeState from "./state/ThemeState";
import AuthState from "./state/AuthState";
import ProductCategoryState from "./state/ProductCategoryState";
import ProductState from "./state/ProductState";
import SizeState from "./state/SizeState";
import ColorAndSizeState from "./state/ColorAndSizeState";

const MainContextProvider = ({ children }) => {
  return (
    <GlobalState>
      <ThemeState>
        <AuthState>
          <ProductCategoryState>
            <ProductState>
             
                <SizeState>
                  <ColorAndSizeState>{children}</ColorAndSizeState>
                </SizeState>
             
            </ProductState>
          </ProductCategoryState>
        </AuthState>
      </ThemeState>
    </GlobalState>
  );
};

export default MainContextProvider;
