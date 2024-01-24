
import ButtonCodeShare from "@/components/molecules/button-code-share";
import { socket } from "@/lib/socket";


socket.on('live', () => {

})




export default function Home() {  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <ButtonCodeShare />
    </main>
  );
}