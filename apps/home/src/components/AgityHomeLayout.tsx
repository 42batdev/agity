import Head from "next/head";
import React, { ReactNode } from "react";
import { Page, PageContent, PageHeader } from "ui";

export interface AgityHomeLayoutProps {
  title: string;
  children: ReactNode;
}

export const AgityHomeLayout = ({ title, children }: AgityHomeLayoutProps) => {
  return (
    <Page>
      <Head>
        <title>{title}</title>
      </Head>
      <PageHeader
        links={[
          { title: "Overview", href: `/dashboard` },
          { title: "Settings", href: `/dashboard/settings` },
        ]}
      />
      <PageContent>{children}</PageContent>
    </Page>
  );
};
