
import Image from "next/image";
import Link from "next/link";
import { Home, PanelLeft, Search, Settings, Wallet } from "lucide-react";
import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
    BreadcrumbSeparator
} from "~/app/_components/ui/breadcrumb";
import { Button } from "~/app/_components/ui/button";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "~/app/_components/ui/dropdown-menu";
import { Input } from "~/app/_components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/app/_components/ui/sheet";
import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "~/app/_components/ui/tooltip";
import { ThemeToggle } from "~/app/_components/ui/theme-toggle";


export default function Header() {
    return (

        <><div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
        </div><DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Image
                            src="https://api.dicebear.com/9.x/pixel-art/png"
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu><ThemeToggle /></>
    )
}
