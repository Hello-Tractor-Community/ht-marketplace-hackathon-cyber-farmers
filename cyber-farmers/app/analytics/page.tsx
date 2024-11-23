import Image from "next/image";
import { AnalyticsWrapper } from "../components/analytics/analyticsMain";

//should take a post request with the user's jwt,for identification while using the app.
export default function AnalyticsPage(){
  return (
    //before reaching the analytics component his role is checked here in order to define the kind of listings he'll be getting
    <AnalyticsWrapper userName="@ronnyogetaz"/>
  );
}
