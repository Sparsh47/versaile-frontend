import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownTrayIcon, EllipsisVerticalIcon, ShareIcon, DocumentIcon } from "@heroicons/react/20/solid";
import { copyToClipboard } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function OptionsDropDown({
                                    saveFn,
                                    savePdfFn,
                                    children,
                                }: {
    saveFn: (fileName: string) => void;
    savePdfFn: (fileName: string) => void;
    children: ReactNode;
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<"docx" | "pdf" | null>(null);
    const [fileName, setFileName] = useState<string>("untitled");

    const onClickSaveAs = (type: "docx" | "pdf") => {
        setDialogType(type);
        setFileName("untitled");
        setIsDialogOpen(true);
    };

    const onConfirmSave = () => {
        if (!dialogType) return;

        let nameWithExt = fileName.trim();
        if (dialogType === "docx") {
            saveFn(nameWithExt);
        } else {
            savePdfFn(nameWithExt);
        }

        setIsDialogOpen(false);
        setDialogType(null);
    };

    return (
        <>
            <div className="fixed top-2 right-2 md:right-8 z-[200]">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild className="w-fit p-0">
                        <Button variant="ghost">
                            <EllipsisVerticalIcon className="w-6 h-6" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-fit z-[200]">
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="flex items-center justify-between px-2 py-2 cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <ArrowDownTrayIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                        <span>Save As</span>
                                    </div>
                                </DropdownMenuSubTrigger>

                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className="z-[200] relative right-1">
                                        <DropdownMenuItem
                                            className="flex items-center justify-start gap-2 px-2 py-2 cursor-pointer"
                                            onClick={() => onClickSaveAs("docx")}
                                        >
                                            <DocumentIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                            <span>Docx (*.docx)</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem
                                            className="flex items-center justify-start gap-2 px-2 py-2 cursor-pointer"
                                            onClick={() => onClickSaveAs("pdf")}
                                        >
                                            <DocumentIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                            <span>PDF (*.pdf)</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuItem
                                className="flex items-center justify-start gap-2 px-2 py-2 cursor-pointer"
                                onClick={() => copyToClipboard(window.location.href)}
                            >
                                <ShareIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                <span>Share</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>{children}</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-md w-[90%] sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Enter File Name</DialogTitle>
                        <DialogDescription>
                            {dialogType === "docx"
                                ? "Please choose a name for your DOCX file."
                                : "Please choose a name for your PDF file."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-2 py-4">
                        <Label htmlFor="filename-input">Filename</Label>
                        <Input
                            id="filename-input"
                            placeholder={dialogType === "docx" ? "untitled.docx" : "untitled.pdf"}
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                    </div>

                    <DialogFooter className="flex flex-col gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={onConfirmSave} disabled={fileName.trim().length === 0}>
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
