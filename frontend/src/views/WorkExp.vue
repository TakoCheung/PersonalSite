<template>
  <v-row dense>
    <v-col cols="12">
      <ExpCard organization="Walmart Global Tech" :start="walmarStart" :end="today" :detail-card-height=466
        :time-line-card-height=256 positionTitle="Software Engineer III"
        shortDesc="• Reduced the 100% time used for localization work for Walmart.com by automating the localization coding process in shell script."
        longDesc="<p>• Reduced the 100% time used for localization work for Walmart.com by automating 
              the localization coding process in shell script.</p>
            <p>• Reduced the run time of the integration test suite by 30% and eliminated any 
              potential race conditions by refactoring the test structure from reading file into 
              constructing the json object for each class.</p>
            <p>• Eliminated engineering team involvement by templatizing the coding process to add 
              a new react card to existing page without code changes.</p>
            <p>• Pinpointed production issue using Splunk Search Processing Language.</p>
            <p>• Reduced time used for our team member by implementing a Selenium test suite.</p>
            <p>• Automated a file consummation process using SFTP, Spring Batch, and Kafka.</p>"
        pathToLogo="../../assets/wmt.jpeg" 
        color-of-org="#0eee7d" 
        id="wmt" />
    </v-col>
    <v-col cols="12">
      <ExpCard organization="Farragut Systems" :start="fsStart" :end="fsEnd" :detail-card-height=266
        :time-line-card-height=256 positionTitle="Software Developer"
        shortDesc="• Integrated Jenkins with MS Team to enable real-time notification for better CI monitoring." longDesc="<p>• Converted an Angular component into React component.</p>
            <p>• Made a Message Box component in React so that the Message Box is reusable within the App.</p>
            <p>• Write the code in the cloud with Cloud9, CloudFormation, CloudWatch, Lambda, Step Function, S3, EC2 in AWS
            </p>" pathToLogo="../../assets/farragut.jpeg" color-of-org="#d7332c" id="fs" />
    </v-col>
    <v-col cols="12">
      <ExpCard organization="CentralSquare Techolgies" :start="cstStart" :end="cstEnd" :detail-card-height=306
        :time-line-card-height=256 positionTitle="Software Developer III" shortDesc="• Implemented a secured web API using
        <a href='https://docs.microsoft.com/en-us/dotnet/framework/network-programming/httplistener'>HttpListener</a> with JWT
        authorization." longDesc="<p>• Designed and implemented an event-driven software which will send a request to the middle-tier server with
            JWT authentication, and fetch the data back to the client.</p>
          <p>• Transformed an XML file to another XML file with the different formats by using XSLT and XPath.</p>
          <p>• Implemented a Field Change Extension which allows the developer to configure it by a single JSON file.</p>
        </v-card-text>" pathToLogo="../../assets/cst.jpeg" color-of-org="#ef4b24" id="cst" />
    </v-col>
    <v-col cols="12">
      <ExpCard organization="Honeywell" :start="hwStart" :end="hwEnd" :detail-card-height=586 :time-line-card-height=256
        positionTitle="Software Developer (CO-OP)" shortDesc="Requirement Analysis:
        <p>• HTTPS became a requirement when we were designing the User Management Web App.</p>" longDesc="Requirement Analysis:
          <p>• HTTPS became a requirement when we were designing the User Management Web App.</p>
          <p>Design:</p>
          <p>• Eliminated the possibility of OS injection and improved the performance by using Ajax to upload the file,
            parsing the file into binary without saving the file on the server.</p>
          <p>• Cleaner and easier to maintain by following MVC for both frontend and backend</p>
          <p>Implementation:</p>
          <p>• Saved company about $100,000 by Implementing a single step firmware upgrade.</p>
          <p>Testing:</p>
          <p>• Speeded up the building process by 20% after Postman became the tool of integration testing.</p>
          <p>Maintenance:</p>
          <p>• Prevented introducing new implementation bug by integrating Fortify SCA scanning process into Gradle and
            the Gradle script into the Jenkins pipeline.</p>
          <p>• Reduced the deployment time by 50% by modifying the existing batch script.</p>"
        pathToLogo="../../assets/hw.jpeg" color-of-org="#ef3124" id="hw" />
    </v-col>
  </v-row>
</template>

<script>
import ExpCard from '@/components/Card/ExpCard.vue';
export default {
  name: 'WorkExp',
  components: {
    ExpCard
  },
  setup() {
    const today = new Date(Date.now());
    const walmarStart = new Date(2022, 4, 4);
    const fsEnd = new Date(2022, 4, 4);
    const fsStart = new Date(2021, 1, 4);
    const cstEnd = new Date(2021, 1, 4);
    const cstStart = new Date(2018, 5, 4);
    const hwEnd = new Date(2018, 5, 4);
    const hwStart = new Date(2016, 1, 4);
    return { hwStart, hwEnd, cstStart, cstEnd, fsStart, fsEnd, walmarStart, today }
  }
}
</script>
