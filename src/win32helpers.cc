/**
 * @file win32helpers.cc
 * @brief Windows-specific utility functions
 * @author Supakorn "Jamie" Rassameemasmuang (jamievlin [at] outlook.com)
 */

#if defined(_WIN32)
#include "win32helpers.h"
#include "errormsg.h"

using camp::reportError;

namespace camp::w32
{
void checkResult(BOOL result, string const& message)
{
  if (!result)
  {
    DWORD errorCode= GetLastError();
    ostringstream msg;
    msg << message << "; error code = 0x" << std::hex << errorCode << std::dec;
    reportError(msg);
  }
}

#pragma region HandleRaiiWrapper

HandleRaiiWrapper::HandleRaiiWrapper(HANDLE const& handle)
    : hd(handle)
{
}

HandleRaiiWrapper::~HandleRaiiWrapper()
{
  if (hd)
  {
    if (!CloseHandle(hd))
    {
      cerr << "Warning: Cannot close handle" << endl;
    }
  }
}

HandleRaiiWrapper::HandleRaiiWrapper(HandleRaiiWrapper&& other) noexcept
: hd(std::exchange(other.hd, nullptr))
{
}

HANDLE HandleRaiiWrapper::getHandle() const
{
  return hd;
}

LPHANDLE HandleRaiiWrapper::put()
{
  if (hd)
  {
    w32::checkResult(CloseHandle(hd));
    hd = nullptr;
  }

  return &hd;
}

#pragma endregion

string buildWindowsCmd(const mem::vector<string>& command)
{
  ostringstream out;
  for (auto it= command.begin(); it != command.end(); ++it)
  {
    out << '"' << *it << '"';
    if (std::next(it) != command.end())
    {
      out << ' ';
    }
  }

  return out.str();
}

}// namespace camp::w32

#endif