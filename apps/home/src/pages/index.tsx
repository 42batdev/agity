import React from "react";
import { PageSubHeader } from "ui";
import { IndexComponent } from "../components/index/IndexComponent";
import { AgityHomeLayout } from "../components/AgityHomeLayout";

const Index = () => {
  return (
    <AgityHomeLayout title={"Agity Dashboard"}>
      <PageSubHeader
        title="Your Teams"
        subTitle={"The Teams you have access to"}
      />
      <IndexComponent />
    </AgityHomeLayout>
  );
};
export default Index;
