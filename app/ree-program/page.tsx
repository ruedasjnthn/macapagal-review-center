import type { Metadata } from "next";
import { reeProgram } from "../program-detail-data";
import { ProgramDetailPage } from "../program-detail-page";

const program = reeProgram;

export const metadata: Metadata = {
  title: `${program.title} | Macapagal Review Center`,
  description: program.description,
};

export default function ReeProgramPage() {
  return <ProgramDetailPage program={program} />;
}
