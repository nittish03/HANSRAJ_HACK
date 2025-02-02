import LandingPage from '@/components/LandingPage'
import PollutionChatBot from '@/components/PollutionChatbot'

export default function Home() {
  return (
<>
<div className="w-screen h-[90vh] bg-black overflow-hidden ">

<LandingPage/>
<PollutionChatBot/>

</div>
</>
  );
}
