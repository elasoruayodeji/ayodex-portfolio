import Link from "next/link";
import Nav from "@/components/Nav";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";

export default function FTCPage() {
  return (
    <>
      <ProgressBar />
      <Nav />

      <main className="pt-32">
        <div className="wrap max-w-[60rem]">
          <Link
            href="/#work"
            className="text-paper-dim text-[0.85rem] hover:text-gold"
          >
            ← Back to work
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <span className="bg-gold text-ink text-[0.7rem] font-semibold px-2.5 py-1 rounded">
              Functional prototype
            </span>
            <span className="text-paper-dim text-[0.8rem]">2025</span>
          </div>

          <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] mt-6">
            FTC Ikoyi — student feedback portal
          </h1>

          <p className="text-paper-dim text-[1.15rem] max-w-[52ch] mt-6">
            A web-based feedback and reporting system built as my final-year
            school project at Federal Training Centre, Ikoyi, Lagos. Replaces
            paper suggestion boxes with a working digital submission pipeline.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 border-t border-line pt-8">
            <div>
              <div className="text-gold text-[0.75rem] mb-1.5">Role</div>
              <div className="text-paper-dim text-[0.95rem]">
                Solo build — design, frontend, backend
              </div>
            </div>
            <div>
              <div className="text-gold text-[0.75rem] mb-1.5">Stack</div>
              <div className="text-paper-dim text-[0.95rem]">
                HTML, CSS, JavaScript, Google Apps Script, Google Sheets
              </div>
            </div>
            <div>
              <div className="text-gold text-[0.75rem] mb-1.5">Status</div>
              <div className="text-paper-dim text-[0.95rem]">
                Working prototype — submitted
              </div>
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="wrap max-w-[80rem] mt-16">
          <div className="aspect-[16/9] bg-panel border border-line rounded-md overflow-hidden">
            <img
              src="/work/ftc-ikoyi/hero.png"
              alt="FTC Ikoyi student feedback portal"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-paper-dim text-[0.8rem] mt-3 text-center">
            Student-facing feedback portal — landing view
          </p>
        </div>

        <div className="wrap max-w-[60rem] mt-20 pb-28">
          <div className="space-y-14">
            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                The problem
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                Feedback was being lost in a paper suggestion box.
              </h2>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                Federal Training Centre, Ikoyi ran its student feedback through
                physical suggestion boxes and handwritten notes. There was no
                reliable way to track when feedback came in, no way to filter
                responses by topic, and no way for students to submit
                anonymously if they wanted to.
              </p>
            </div>

            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                How it evolved
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                Started as a Google Forms proposal. Ended as a real web app.
              </h2>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                The initial design used Google Forms for submission and Sheets
                for storage. That approach was functionally complete, but it
                skipped the actual design and implementation work — which was
                the point of the project. So I rebuilt it as a proper web app:
                a custom HTML/CSS/JavaScript frontend that talks to a Google
                Apps Script backend, which writes submissions into a Google
                Sheet.
              </p>
            </div>

            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                What I built
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                A full submission pipeline, frontend to storage.
              </h2>
              <ul className="text-paper-dim text-[1.05rem] space-y-2 list-disc pl-5 max-w-[58ch]">
                <li>Custom-designed student feedback portal with a clear, approachable interface</li>
                <li>Feedback form with validation and structured inputs</li>
                <li>Client-side JavaScript that submits to a Google Apps Script endpoint</li>
                <li>Real-time progress indicator as the user fills the form</li>
                <li>Success and error states — the form tells the user what happened</li>
                <li>Reset flow so students can submit multiple reports</li>
                <li>Submissions stored in a Google Sheet with timestamps for staff review</li>
                <li>Separated structure — HTML, CSS, and JavaScript in distinct files</li>
              </ul>
            </div>

            {/*
            OPTIONAL SECOND IMAGE — uncomment if you add form.png
            <div>
              <div className="text-gold text-[0.75rem] mb-4">
                Form in action
              </div>
              <div className="aspect-[16/9] bg-panel border border-line rounded-md overflow-hidden">
                <img
                  src="/work/ftc-ikoyi/form.png"
                  alt="Feedback form filled in"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            */}

            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                Why this approach
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                The backend is serverless — and free to run.
              </h2>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                A traditional backend would need hosting, a database, and
                ongoing maintenance. Using Google Apps Script as the submission
                endpoint means the system has zero infrastructure cost, no
                server to keep alive, and storage that the FTC staff already
                know how to access — a Google Sheet they can open, sort, and
                filter like any spreadsheet. For a real organisation that
                doesn&apos;t have a technical team, that&apos;s the right trade.
              </p>
            </div>

            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                What I learned
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                Full-loop thinking — frontend, network, storage.
              </h2>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                Building this taught me how a form submission actually travels
                — from a button click, through an HTTP request, into a
                serverless function, and finally into a row in a spreadsheet.
                Handling the loader state, the success message, and the error
                fallback also made me think about what a user needs to see
                when something is happening in the background.
              </p>
            </div>

            <div className="border-t border-line pt-8">
              <div className="text-gold text-[0.75rem] mb-2">
                Current status
              </div>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                Submitted as my final-year project and accepted without
                corrections. The submission pipeline is functional — form
                responses reach the Google Sheet. What&apos;s next if I keep
                building on it: a staff-facing dashboard to view and filter
                submissions without opening the raw Sheet, and a proper
                deployment to a public URL.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}