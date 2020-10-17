import { ComposeNextCallback, inject, Middleware, MiddlewareTransform } from "@typeclient/core";
import { EditorService } from "../editor.service";
import { TEditorContext } from "../editor.state";

@Middleware()
export class EditorPluginMiddleware implements MiddlewareTransform<TEditorContext> {
  @inject(EditorService) private readonly service: EditorService;
  async use(ctx: TEditorContext, next: ComposeNextCallback) {
    const res = await this.service.getEditorPluginList();
    ctx.state.plugins.list = res.data;
    await next();
  }
}