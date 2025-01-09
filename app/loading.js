import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";

export default function Loading({className}) {
    return (
        <Container className="h-[50vh] flex items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="blue"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("animate-spin", className)}
            >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
        </Container>
    )
}