'use client';

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
import { redirect, usePathname } from 'next/navigation';
import clsx from 'clsx';
import Header from "./header";

const links = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/budget", label: "Budget", icon: Wallet },
    { href: "/dashboard/settings", label: "Settings", icon: Settings, isBottom: true },
];

function generateBreadcrumbs(pathname: string) {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        return { href, label: segment.charAt(0).toUpperCase() + segment.slice(1) };
    });
}

export default function NavLinks() {
    const pathname = usePathname();
    const breadcrumbs = [...generateBreadcrumbs(pathname)];

    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <TooltipProvider>
                        {links.filter(link => !link.isBottom).map(({ href, label, icon: Icon }) => (
                            <Tooltip key={label}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={href}
                                        className={clsx("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", {
                                            "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8": pathname === href
                                        })}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="sr-only">{label}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">{label}</TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                    <TooltipProvider>
                        {links.filter(link => link.isBottom).map(({ href, label, icon: Icon }) => (
                            <Tooltip key={label}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={href}
                                        className={clsx("flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8", {
                                            "text-foreground": pathname === href
                                        })}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="sr-only">{label}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">{label}</TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </nav>
            </aside>
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                            {links.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Icon className="h-5 w-5" />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        {breadcrumbs.map((breadcrumb, index) => (
                            <BreadcrumbItem key={breadcrumb.href}>
                                <BreadcrumbLink asChild>
                                    <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                                </BreadcrumbLink>
                                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator key={`sep-${breadcrumb.href}`} />}
                            </BreadcrumbItem>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <Header />
            </header>
        </>
    );
}
