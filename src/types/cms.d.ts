declare namespace ICms {
  interface ComponentItem {
    index?: number,
    offsetX?: number,
    offsetY?: number,
    type: string,
    x: number,
    y: number
  }
  type State = {
    componentList: ComponentItem[],
    index: number
  }
  // TODO 类似这种的 data 类型如何处理，建立一个泛型接口？但可能互相完全没关联
  type Action = {
    type: string,
    data: any
  }
  // .d.ts 声明文件里的枚举应该是仅仅在运行检测时起效果，不能像在外部使用那样进行实体代码的转化
  // 所以组件的类型
  // enum ComponentTypes {
  //   cms1 = 'cms_1',
  //   cms2 = 'cms_2'
  // }
}

// TODO
// jQuery 是函数又是对象可以声明联合没问题
// 但 namespace 里还能定义 interface 和 type，又当域名空间又当全局变量不妥吧？因为 namespace 跟枚举类似，编译出来后其实是有存在的代码的？
// 为什么不能用 declare const【1】 与 declare namespace 做声明联合？
// 又或者 declare function 与 declare const【2】 也不能做声明联合？
// 【1】declare const jQuery: (selector: string) => any
declare function jQuery(selector: string): any
// 【2】declare const jQuery: { ajax(url: string, settings?: any): void }
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}

// NPM 包简单机制：https://ts.xcatliu.com/basics/declaration-files#npm-bao
// 直接 declare 是全局声明
// export 借用 es 的模块机制，导出一个局部声明，需要 import 引入

// 类：ES6用法：属性方法、继承、存取器(setter/getter)、静态方法
// 类：ES7用法：实例属性、静态属性
// 类：TS 实现：public/privat/protected、readonly、抽象类

// 接口：类实现(多)接口、接口继承接口(接口声明合并)、接口继承类、混合类型

// 泛型：一般泛型<T>、多类型参数<T, U>、泛型约束<T extends U, U>、泛型接口泛型类、泛型默认类型
