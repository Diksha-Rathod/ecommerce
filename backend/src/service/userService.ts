import { EntityRepository, getRepository } from "typeorm";
import { Role, User } from "../entity/user";
import utill from "../util/helper";

class UserService {

 async getUser() {
    try {
        let userRepo  = getRepository(User);
        let user = await userRepo.find({
          select:{id:true,fullName: true,email:true,isVerified:true},
          where: { role: Role.USER },
        });
      return user;
    } catch (error) {
      console.log(error, "---------getuser service");
    }
  }

  async getUserById(id) {
    try {
        let userRepo  = getRepository(User);
            let user = await userRepo .findOne({ 
                where:{id: id}}
                )
      return user;
    } catch (error) {
      console.log(error, "---------getuserById service");
    }
  }

  async updateUser(id,reqBody) {
      try {
        let userRepo  = getRepository(User);
        const result = await userRepo .update(
                  {
                    id,
                  },
                  {
                   fullName:reqBody.fullName,
                   contactNumber:reqBody.ContactNumber,
                   profileImg:reqBody.imageUrl,
                   DOB:reqBody.DOB,
                   stripeCustomerId:reqBody.id
                  }
                );
                return result;
      } catch (error) {
        console.log(error, "---------updateuser service");
      }
    }

    async deleteUser(id) {
          try {
            const userRepo = await getRepository(User);
            const result=await userRepo.delete(id);
         
            return result;
          } catch (error) {
            console.log(error, "---------deleteuser service");
          }
        }
}
const userService = new UserService();
export default userService;