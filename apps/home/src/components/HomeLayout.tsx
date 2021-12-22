import NextLink from "next/link";
import React, { ReactElement } from "react";
import { PageAppBar, PageContent, PageLayout } from "ui";

export const HomeLayout = ({ page }: { page: ReactElement }) => {
  return (
    <PageLayout>
      <PageAppBar
        links={[
          {
            id: "1",
            children: (
              <NextLink href="/" passHref>
                Home
              </NextLink>
            ),
          },
          {
            id: "2",
            children: (
              <NextLink href="/getting-started" passHref>
                Getting Started
              </NextLink>
            ),
          },
          {
            id: "3",
            children: (
              <NextLink href="/about" passHref>
                About
              </NextLink>
            ),
          },
        ]}
      />
      <PageContent>{page}</PageContent>
    </PageLayout>
  );
};
