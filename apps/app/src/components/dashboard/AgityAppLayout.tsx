import Head from "next/head";
import React, { ReactNode } from "react";
import { Page, PageContent, PageHeader } from "ui";
import { SessionContextProvider } from "supabase";
import { AgityAppServerSideProps } from "./initAppDashboardProps";

export interface AgityAppLayoutProps extends AgityAppServerSideProps {
  title: string;
  children: ReactNode;
}

export const AgityAppLayout = ({ title, children }: AgityAppLayoutProps) => {
  return (
    <SessionContextProvider>
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
    </SessionContextProvider>
  );
};
