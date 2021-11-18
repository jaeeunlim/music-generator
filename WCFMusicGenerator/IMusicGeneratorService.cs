
using Microsoft.Extensions.Configuration;
using System.Data;
using System.ServiceModel;

namespace WCFMusicGenerator
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IMusicGeneratorService
    {

        [OperationContract]
        DataSet GetStavesByMusicId(int musicId, IConfiguration config);
        [OperationContract]
        DataSet GetAllMusic(IConfiguration config);
        [OperationContract]
        DataSet GetMusic(int musicId, IConfiguration config);
        
    }


    
}
