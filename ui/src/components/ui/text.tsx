import { FC } from 'react';

export type TextProps = {
    text: string;
};

const Text: FC<TextProps> = ({ text }) => {
    return <p>{text}</p>;
};

export default Text;
