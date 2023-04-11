class OrderController{
    async getOrder(req,res){ 
       res.render("getOrder");
    }
    async confirmOrder(req,res){
        res.render("confirmOrder")
    }
    async cancelOrder(req,res){
        res.render("deleteOrder")
    }

    
}
const orderController=new OrderController();
export default orderController;