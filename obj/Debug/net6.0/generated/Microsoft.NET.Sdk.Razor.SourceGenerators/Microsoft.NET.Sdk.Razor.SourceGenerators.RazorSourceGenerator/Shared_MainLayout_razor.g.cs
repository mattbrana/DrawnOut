﻿#pragma checksum "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\Shared\MainLayout.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "d308332d3fb66a25a140622ab80b872e66114d07294318bccb310db0ad9e795c"
// <auto-generated/>
#pragma warning disable 1591
namespace DRAWINGwebsite.Shared
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using Microsoft.AspNetCore.Authorization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using Microsoft.AspNetCore.Components.Authorization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using Microsoft.AspNetCore.Components.Forms;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using Microsoft.AspNetCore.Components.Web.Virtualization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using DRAWINGwebsite;

#line default
#line hidden
#nullable disable
#nullable restore
#line 10 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\_Imports.razor"
using DRAWINGwebsite.Shared;

#line default
#line hidden
#nullable disable
    public partial class MainLayout : LayoutComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenComponent<Microsoft.AspNetCore.Components.Web.PageTitle>(0);
            __builder.AddAttribute(1, "ChildContent", (Microsoft.AspNetCore.Components.RenderFragment)((__builder2) => {
                __builder2.AddContent(2, "DRAWINGwebsite");
            }
            ));
            __builder.CloseComponent();
            __builder.AddMarkupContent(3, "\r\n\r\n");
            __builder.OpenElement(4, "div");
            __builder.AddAttribute(5, "class", "page");
            __builder.AddAttribute(6, "b-rt3aau5ng6");
            __builder.OpenElement(7, "main");
            __builder.AddAttribute(8, "b-rt3aau5ng6");
            __builder.OpenElement(9, "article");
            __builder.AddAttribute(10, "class", "content px-4");
            __builder.AddAttribute(11, "b-rt3aau5ng6");
#nullable restore
#line (11,14)-(11,18) 25 "C:\Users\MatthewBrana\source\repos\DRAWINGwebsite\DRAWINGwebsite\Shared\MainLayout.razor"
__builder.AddContent(12, Body);

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
            __builder.CloseElement();
            __builder.CloseElement();
        }
        #pragma warning restore 1998
    }
}
#pragma warning restore 1591
