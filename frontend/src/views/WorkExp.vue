<template>
  <v-col>
    <v-row dense>
      <ExpCard 
        organization="Farragut Systems" 
        :start="fsStart"
        :end="fsEnd" 
        :detail-card-height=226
        :time-line-card-height=256
        positionTitle="Software Developer"
        shortDesc="• Integrated Jenkins with MS Team to enable real-time notification for better CI monitoring."
        longDesc="<p>• Converted an Angular component into React component.</p>
            <p>• Made a Message Box component in React so that the Message Box is reusable within the App.</p>
            <p>• Write the code in the cloud with Cloud9, CloudFormation, CloudWatch, Lambda, Step Function, S3, EC2 in AWS
            </p>"
        pathToLogo="../../assets/farragut.jpeg"
        color-of-org="#d7332c"
        id="fs"
      />
    </v-row>
    <v-row dense>
      <!-- <CstWorkExpCard /> -->
      <ExpCard 
        organization="CentralSquare Techolgies" 
        :start="cstStart"
        :end="cstEnd" 
        :detail-card-height=286
        :time-line-card-height=256
        positionTitle="Software Developer III"
        shortDesc="• Implemented a secured web API using
        <a href='https://docs.microsoft.com/en-us/dotnet/framework/network-programming/httplistener'>HttpListener</a> with JWT
        authorization."
        longDesc="<p>• Designed and implemented an event-driven software which will send a request to the middle-tier server with
            JWT authentication, and fetch the data back to the client.</p>
          <p>• Transformed an XML file to another XML file with the different formats by using XSLT and XPath.</p>
          <p>• Implemented a Field Change Extension which allows the developer to configure it by a single JSON file.</p>
        </v-card-text>"
        pathToLogo="../../assets/cst.jpeg"
        color-of-org="#ef4b24"
        id="cst"
      />
    </v-row>
    <v-row dense>
      <HoneywellExpCard />
    </v-row>
  </v-col>
</template>

<script>
import HoneywellExpCard from './HoneywellExpCard'
// import CstWorkExpCard from './CstWorkExpCard'
import ExpCard from '@/components/Card/ExpCard.vue';
export default {
  name: 'WorkExp',
  components: {
    HoneywellExpCard,
    // CstWorkExpCard,
    ExpCard
  },
  setup(){
    const today = new Date(Date.now());
    const walmarStart = new Date(2022, 4, 4);
    const fsEnd = new Date(2022, 4, 4);
    const fsStart = new Date(2021, 1, 4);
    const cstEnd = new Date(2021, 1, 4);
    const cstStart = new Date(2018, 5, 4);
    const hwEnd = new Date(2018, 5, 4);
    const hwStart = new Date(2016, 1, 4);
    return {hwStart,hwEnd,cstStart,cstEnd,fsStart,fsEnd,walmarStart,today}
  }
}
</script>
