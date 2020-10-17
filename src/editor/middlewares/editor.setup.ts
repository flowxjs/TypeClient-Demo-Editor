import { ComposeNextCallback, Middleware, MiddlewareTransform } from "@typeclient/core";
import { TEditorContext } from "../editor.state";

@Middleware()
export class EditorSetupMiddleware implements MiddlewareTransform<TEditorContext> {
  async use(ctx: TEditorContext, next: ComposeNextCallback) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await next();
  }
}