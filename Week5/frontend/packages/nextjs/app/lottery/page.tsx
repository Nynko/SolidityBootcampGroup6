import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
    title: "Lottery",
    description: "Participate in the Lottery",
});

const Lottery: NextPage = () => {
    return (
        <>
            <div className="text-center mt-8 bg-secondary p-10">
                <h1 className="text-4xl my-0">Lottery !</h1>
                <p className="text-neutral">
                    Lottery
                    <br /> Check{" "}
                    <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
                        packages / nextjs / app / lottery / page.tsx
                    </code>{" "}
                </p>
            </div>
        </>
    );
};

export default Lottery;
