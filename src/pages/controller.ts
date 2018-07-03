import { JsonController, Get, Param, Put, Body, NotFoundError, HttpCode, Post} from 'routing-controllers'
import Page from './entity'

// type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

   // @Get('/pages')
    // allPages(): PageList {
    //  return { pages: Object.values(pagesById).map((page)=> page)}
    // }


    @Get('/pages/:id')
    getPage(
      @Param('id') id: number
    ) {
      return Page.findOne(id)
    }


    @Get('/pages')
    async allPages() {
      const pages = await Page.find()
      return { pages }
    }

    @Put('/pages/:id')
    async updatePage(
      @Param('id') id: number,
      @Body() update: Partial<Page>
    ) {
      const page = await Page.findOne(id)
      if (!page) throw new NotFoundError('Cannot find page')
    
      return Page.merge(page, update).save()
    }


//     @Put('/pages/:id')
//     updatePage(
//         @Param('id') id: number,
//         @Body() body: Partial<Page>
//     ): Page {
//         console.log(`Incoming PUT body param:`, body)
//         return pagesById[id]
//     }
@Post('/pages')
@HttpCode(201)
createPage(
  @Body() page: Page
) {
  return page.save()
}


}
