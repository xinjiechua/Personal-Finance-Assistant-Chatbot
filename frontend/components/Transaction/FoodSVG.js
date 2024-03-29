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
            <Rect width={60} height={60} fill="#FDD5D7" rx={16} />
            <Path
                fill="#FD3C4A"
                d="M37.5 15a6.25 6.25 0 0 0-6.25 6.25v2.5a6.25 6.25 0 0 0 5 6.125v2.85a3.75 3.75 0 0 0-2.5 3.525v5a3.75 3.75 0 0 0 7.5 0v-5a3.75 3.75 0 0 0-2.5-3.525v-2.85a6.25 6.25 0 0 0 5-6.125v-2.5A6.25 6.25 0 0 0 37.5 15ZM27.5 15a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 1-2.5 0v-5a1.25 1.25 0 0 0-2.5 0v5a1.25 1.25 0 0 1-2.5 0v-5a1.25 1.25 0 0 0-2.5 0v7.5a6.25 6.25 0 0 0 5 6.125v2.85a3.75 3.75 0 0 0-2.5 3.525v5a3.75 3.75 0 0 0 7.5 0v-5a3.75 3.75 0 0 0-2.5-3.525v-2.85a6.25 6.25 0 0 0 5-6.125v-7.5A1.25 1.25 0 0 0 27.5 15Z"
            />
        </Svg>
    );
};

export default ShoppingSVG;
