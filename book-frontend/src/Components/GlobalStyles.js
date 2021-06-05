import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};

    body {
        width: 100%;
        padding: 75px 10px 10px 10px;
    }
    * {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default globalStyles;