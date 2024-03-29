import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const ShoppingSVG = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={60}
            height={60}
            fill="none"
        >
            <Rect width={60} height={60} fill="#FCEED4" rx={16} />
            <Path
                fill="#FCAC12"
                d="M41.25 35H18.225l1 5a6.25 6.25 0 0 0 6.125 5h9.3a6.25 6.25 0 0 0 6.125-5l1-5h-.525Zm-12.5 6.25a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5Zm5 0a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5ZM41.25 22.5h-2.5v-1.25A6.25 6.25 0 0 0 32.5 15h-5a6.25 6.25 0 0 0-6.25 6.25v1.25h-2.5A3.75 3.75 0 0 0 15 26.25v2.5a3.75 3.75 0 0 0 3.75 3.75h22.5A3.75 3.75 0 0 0 45 28.75v-2.5a3.75 3.75 0 0 0-3.75-3.75Zm-17.5-1.25a3.75 3.75 0 0 1 3.75-3.75h5a3.75 3.75 0 0 1 3.75 3.75v1.25h-12.5v-1.25Z"
            />
        </Svg>
    );
};

export default ShoppingSVG;
