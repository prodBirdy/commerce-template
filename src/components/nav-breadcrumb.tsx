'use client'

import { Home } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb"

export function NavBreadcrumb() {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    // Function to format path names for better readability
    const formatPathName = (name: string) => {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    // Function to render breadcrumb items with ellipsis for long paths
    const renderBreadcrumbItems = () => {
        const items = []
        const totalPaths = pathNames.length
        const shouldShowEllipsis = totalPaths > 4

        // Always show home
        items.push(
            <React.Fragment key="home">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="text-sm">
                        <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {totalPaths > 0 && <BreadcrumbSeparator className="h-4 w-4" />}
            </React.Fragment>
        )

        if (shouldShowEllipsis) {
            // Show first path
            if (totalPaths > 0) {
                const href = `/${pathNames[0]}`
                const isActive = href === paths

                items.push(
                    <React.Fragment key={0}>
                        <BreadcrumbItem>
                            {isActive ? (
                                <BreadcrumbPage className="text-sm">
                                    {formatPathName(pathNames[0])}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink className="text-sm" href={href}>
                                    {formatPathName(pathNames[0])}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="h-4 w-4 " />
                    </React.Fragment>
                )
            }

            // Show ellipsis
            items.push(
                <React.Fragment key="ellipsis">
                    <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="h-4 w-4" />
                </React.Fragment>
            )

            // Show last two paths
            const lastTwoPaths = pathNames.slice(-2)
            lastTwoPaths.forEach((name, index) => {
                const actualIndex = totalPaths - 2 + index
                const href = `/${pathNames.slice(0, actualIndex + 1).join('/')}`
                const isActive = href === paths
                const isLast = actualIndex === totalPaths - 1

                items.push(
                    <React.Fragment key={actualIndex}>
                        <BreadcrumbItem>
                            {isActive ? (
                                <BreadcrumbPage className="text-sm">
                                    {formatPathName(name)}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink className="text-sm" href={href}>
                                    {formatPathName(name)}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator className="h-4 w-4" />}
                    </React.Fragment>
                )
            })
        } else {
            // Show all paths when 4 or fewer
            pathNames.forEach((name, index) => {
                const href = `/${pathNames.slice(0, index + 1).join('/')}`
                const isActive = href === paths
                const isLast = index === totalPaths - 1

                items.push(
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {isActive ? (
                                <BreadcrumbPage className="text-sm text-primary">
                                    {formatPathName(name)}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink className="text-sm" href={href}>
                                    {formatPathName(name)}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator className="h-4 w-4" />}
                    </React.Fragment>
                )
            })
        }

        return items
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {renderBreadcrumbItems()}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
