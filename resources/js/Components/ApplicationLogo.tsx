import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return <img src="/img/logo.png" alt="Logo" {...props} />;
}
