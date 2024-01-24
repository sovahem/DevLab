"use client";

import { useRouter } from 'next/navigation';
import { useId } from 'react';
import { Button } from '../ui/button';

const ButtonCodeShare = () => {

    const roomID = useId();
    const router  = useRouter();

    const redirectToSandbox = () => {
        // socket.emit('join', 'rerere')
        router.push(`/${roomID.replace(/[^\w\s]/gi, '')}`);
    }

    return (
      <Button onClick={() => redirectToSandbox()}>Share Code Now</Button>
    )
}

export default ButtonCodeShare
