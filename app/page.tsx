import { Button } from "@/components/ui/button";
import { CircleCheck, FileUp } from "lucide-react";


export default function Home() {
  return (
    <main className="w-full flex flex-col bg-background text-forefround gap-8 text-sm md:text-base lg:text-lg">
      <div className="">
        <h2 className="text-lg md:text-xl lg:text-3xl font-semibold mb-1">Clinic Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, <span className="">Dr.Chen</span>. Review today's diagnostic insights and pending lab reports.</p>
      </div>

      {/* Upload file */}
      <div className="w-full rounded-md border border-border border-dashed border-2 flex flex-col items-center justify-center gap-2 py-8 px-2 md:px-4">
        <FileUp className="w-16 h-16 text-primary bg-accent/70 px-2 py-2 rounded-md mb-4 " />
        <h3 className="text-base md:text-lg lg:text-2xl font-semibold">Drop Lab Reports</h3>
        <p className="text-xs md:text-sm lg:text-base text-center mb-2">Drag and drop PDF, CSV, or Text files here to begin automated analysis.</p>
        <div className="flex items-center justify-between gap-2 mb-8 lg:mb-10">
          <Button className="">Select Files</Button>
          <Button variant={"outline"} className="">Scan via Camera</Button>
        </div>

        <div className="w-full flex justify-center items-center gap-6 text-muted-foreground/80">
          <div className="flex items-center gap-2">
            <CircleCheck className="w-4 h-4 text-muted-foreground/80" />
            <span className="text-[8px] md:text-sm">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheck className="w-4 h-4 text-muted-foreground/80" />
            <span className="text-[8px] md:text-sm">End-to-End Encryption</span>
          </div>
        </div>
      </div>

      {/* Result Table */}

      {/* AI clinic summary */}


      {/* Action */}

    </main>
  );
}
