import type { Metadata } from "next";
import { programDetails } from "../program-detail-data";
import { ProgramDetailPage } from "../program-detail-page";

const program = programDetails.RME;

export const metadata: Metadata = {
  title: `${program.title} | Macapagal Review Center`,
  description: program.description,
};

export default function RmeProgramPage() {
  return <ProgramDetailPage program={program} />;
}
