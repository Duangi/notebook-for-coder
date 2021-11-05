class A{
    _f = this.f
    f = (x)=>{
        return x
    }
}

const a = new A()
console.log(a._f)